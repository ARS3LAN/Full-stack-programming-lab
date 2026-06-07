const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Treatment = require('../models/Treatment');
const Notification = require('../models/Notification');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// @desc    Get appointments
// @route   GET /api/appointments
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ user: req.user._id });
      if (!patient) return res.status(404).json({ message: 'Patient profile not found' });
      query.patient = patient._id;
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });
      query.doctor = doctor._id;
    }

    const appointments = await Appointment.find(query)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'name email' }
      })
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'name email' }
      })
      .sort({ date: 1, timeSlot: 1 });

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private (Patient only)
router.post('/', protect, authorize(['patient']), async (req, res) => {
  const { doctorId, date, timeSlot, symptoms } = req.body;

  try {
    const patient = await Patient.findOne({ user: req.user._id });
    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }

    const doctor = await Doctor.findById(doctorId).populate('user', 'name');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const appointment = await Appointment.create({
      patient: patient._id,
      doctor: doctorId,
      date,
      timeSlot,
      symptoms,
      status: 'pending'
    });

    // Create Notification for the Patient
    await Notification.create({
      user: req.user._id,
      title: 'Appointment Booked',
      message: `Your appointment request with Dr. ${doctor.user.name} on ${new Date(date).toLocaleDateString()} at ${timeSlot} is pending review.`,
      type: 'appointment',
      emailSent: true,
      mobileAlertSent: true
    });

    // Create Notification for the Doctor
    await Notification.create({
      user: doctor.user._id,
      title: 'New Appointment Request',
      message: `Patient ${req.user.name} requested an appointment for ${new Date(date).toLocaleDateString()} at ${timeSlot}.`,
      type: 'appointment',
      emailSent: true
    });

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'name email' }
      })
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'name email' }
      });

    res.status(201).json(populatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @desc    Approve/Reject or Assign doctor to appointment
// @route   PUT /api/appointments/:id
// @access  Private (Admin or Doctor)
router.put('/:id', protect, authorize(['admin', 'doctor']), async (req, res) => {
  const { status, comments, doctorId } = req.body;

  try {
    let appointment = await Appointment.findById(req.params.id)
      .populate({ path: 'patient', populate: { path: 'user' } })
      .populate({ path: 'doctor', populate: { path: 'user' } });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Verify if doctor is authorized (if role is doctor, they must be the assigned doctor)
    if (req.user.role === 'doctor') {
      const docProfile = await Doctor.findOne({ user: req.user._id });
      if (appointment.doctor._id.toString() !== docProfile._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this appointment' });
      }
    }

    // Assign new doctor if requested (Admin only)
    if (doctorId && req.user.role === 'admin') {
      const newDoctor = await Doctor.findById(doctorId).populate('user');
      if (!newDoctor) {
        return res.status(404).json({ message: 'Target doctor not found' });
      }
      appointment.doctor = doctorId;
    }

    if (status) {
      appointment.status = status;
    }
    if (comments !== undefined) {
      appointment.comments = comments;
    }

    await appointment.save();

    // Re-populate for logs and notifications
    appointment = await Appointment.findById(req.params.id)
      .populate({ path: 'patient', populate: { path: 'user' } })
      .populate({ path: 'doctor', populate: { path: 'user' } });

    // Handle business flow triggers
    if (status === 'confirmed') {
      // 1. Assign doctor to patient profile automatically
      await Patient.findByIdAndUpdate(appointment.patient._id, {
        assignedDoctor: appointment.doctor._id
      });

      // 2. Initialize a Treatment cycle if one doesn't exist
      let treatment = await Treatment.findOne({ appointment: appointment._id });
      if (!treatment) {
        await Treatment.create({
          patient: appointment.patient._id,
          doctor: appointment.doctor._id,
          appointment: appointment._id,
          status: 'active',
          diagnosis: 'General Health Consultation'
        });
      }

      // 3. Notify patient
      await Notification.create({
        user: appointment.patient.user._id,
        title: 'Appointment Confirmed',
        message: `Your appointment with Dr. ${appointment.doctor.user.name} on ${new Date(appointment.date).toLocaleDateString()} at ${appointment.timeSlot} has been confirmed. A continuous treatment cycle has been initialized.`,
        type: 'appointment',
        emailSent: true,
        mobileAlertSent: true
      });
    } else if (status === 'rejected') {
      // Notify patient of rejection
      await Notification.create({
        user: appointment.patient.user._id,
        title: 'Appointment Rejected',
        message: `Your appointment request with Dr. ${appointment.doctor.user.name} was rejected. Note: ${comments || 'No comment provided.'}`,
        type: 'appointment',
        emailSent: true,
        mobileAlertSent: true
      });
    }

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

module.exports = router;
