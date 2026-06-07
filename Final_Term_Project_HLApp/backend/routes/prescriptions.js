const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Treatment = require('../models/Treatment');
const Notification = require('../models/Notification');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// @desc    Get prescriptions
// @route   GET /api/prescriptions
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

    const prescriptions = await Prescription.find(query)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'name email' }
      })
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'name email' }
      })
      .populate('treatment')
      .sort({ createdAt: -1 });

    res.json(prescriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create a new prescription
// @route   POST /api/prescriptions
// @access  Private (Doctors only)
router.post('/', protect, authorize(['doctor']), async (req, res) => {
  const { patientId, treatmentId, appointmentId, medications, instructions } = req.body;

  try {
    // 1. Verify treatment and appointment exist
    const treatment = await Treatment.findById(treatmentId);
    if (!treatment) {
      return res.status(404).json({ message: 'Treatment record not found' });
    }

    const doctorProfile = await Doctor.findOne({ user: req.user._id });
    if (!doctorProfile) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    const patient = await Patient.findById(patientId).populate('user', 'name');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // 2. Create Prescription
    const prescription = await Prescription.create({
      patient: patientId,
      doctor: doctorProfile._id,
      treatment: treatmentId,
      appointment: appointmentId,
      medications,
      instructions
    });

    // 3. Create Notification for new prescription
    await Notification.create({
      user: patient.user._id,
      title: 'New Prescription Added',
      message: `Dr. ${req.user.name} added a prescription. Instructions: ${instructions || 'Follow guidelines.'}`,
      type: 'system',
      emailSent: true,
      mobileAlertSent: true
    });

    // 4. Create Simulated Medication Alerts based on schedule
    for (const med of medications) {
      await Notification.create({
        user: patient.user._id,
        title: `Schedule Alert: ${med.name}`,
        message: `Medication Reminder: Take ${med.name} (${med.dosage}) - ${med.frequency} for ${med.duration}.`,
        type: 'medication',
        emailSent: false,
        mobileAlertSent: true
      });
    }

    const populatedPrescription = await Prescription.findById(prescription._id)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'name' }
      })
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'name' }
      });

    res.status(201).json(populatedPrescription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

module.exports = router;
