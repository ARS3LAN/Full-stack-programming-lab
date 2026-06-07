const express = require('express');
const router = express.Router();
const Treatment = require('../models/Treatment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Notification = require('../models/Notification');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// @desc    Get treatments
// @route   GET /api/treatments
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

    const treatments = await Treatment.find(query)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'name email' }
      })
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'name email' }
      })
      .populate('appointment')
      .sort({ createdAt: -1 });

    res.json(treatments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single treatment details
// @route   GET /api/treatments/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const treatment = await Treatment.findById(req.params.id)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'name email' }
      })
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'name email' }
      })
      .populate('appointment');

    if (!treatment) {
      return res.status(404).json({ message: 'Treatment record not found' });
    }

    // Role check permissions
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ user: req.user._id });
      if (treatment.patient.toString() !== patient._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to view this treatment' });
      }
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (treatment.doctor.toString() !== doctor._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to view this treatment' });
      }
    }

    res.json(treatment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Add checkup results to treatment cycle
// @route   POST /api/treatments/:id/checkup
// @access  Private (Doctors only)
router.post('/:id/checkup', protect, authorize(['doctor']), async (req, res) => {
  const { weight, height, bloodPressure, pulse, notes } = req.body;

  try {
    const treatment = await Treatment.findById(req.params.id)
      .populate({ path: 'patient', populate: { path: 'user' } })
      .populate({ path: 'doctor', populate: { path: 'user' } });

    if (!treatment) {
      return res.status(404).json({ message: 'Treatment record not found' });
    }

    // Make sure doctor is the assigned doctor
    const doctorProfile = await Doctor.findOne({ user: req.user._id });
    if (treatment.doctor.toString() !== doctorProfile._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this treatment' });
    }

    const checkupObj = {
      date: new Date(),
      weight,
      height,
      bloodPressure,
      pulse,
      notes
    };

    treatment.checkups.push(checkupObj);
    await treatment.save();

    // Create Notification alert for Patient
    await Notification.create({
      user: treatment.patient.user._id,
      title: 'New Physical Checkup Added',
      message: `Dr. ${treatment.doctor.user.name} logged a new checkup. BP: ${bloodPressure}, Pulse: ${pulse} bpm, Weight: ${weight}kg.`,
      type: 'system',
      emailSent: true,
      mobileAlertSent: true
    });

    res.status(201).json(treatment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @desc    Schedule a follow-up visit
// @route   POST /api/treatments/:id/followup
// @access  Private (Doctors only)
router.post('/:id/followup', protect, authorize(['doctor']), async (req, res) => {
  const { date, notes } = req.body;

  try {
    const treatment = await Treatment.findById(req.params.id)
      .populate({ path: 'patient', populate: { path: 'user' } })
      .populate({ path: 'doctor', populate: { path: 'user' } });

    if (!treatment) {
      return res.status(404).json({ message: 'Treatment record not found' });
    }

    // Doctor checks
    const doctorProfile = await Doctor.findOne({ user: req.user._id });
    if (treatment.doctor.toString() !== doctorProfile._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this treatment' });
    }

    const followupObj = {
      date,
      status: 'scheduled',
      notes
    };

    treatment.followUps.push(followupObj);
    await treatment.save();

    // Notification
    await Notification.create({
      user: treatment.patient.user._id,
      title: 'Follow-up Scheduled',
      message: `A follow-up checkup has been scheduled by Dr. ${treatment.doctor.user.name} for ${new Date(date).toLocaleDateString()}.`,
      type: 'followup',
      emailSent: true,
      mobileAlertSent: true
    });

    res.status(201).json(treatment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @desc    Update treatment cycle status and diagnosis
// @route   PUT /api/treatments/:id/status
// @access  Private (Doctors only)
router.put('/:id/status', protect, authorize(['doctor']), async (req, res) => {
  const { status, diagnosis } = req.body;

  try {
    const treatment = await Treatment.findById(req.params.id)
      .populate({ path: 'patient', populate: { path: 'user' } })
      .populate({ path: 'doctor', populate: { path: 'user' } });

    if (!treatment) {
      return res.status(404).json({ message: 'Treatment record not found' });
    }

    // Doctor verification
    const doctorProfile = await Doctor.findOne({ user: req.user._id });
    if (treatment.doctor.toString() !== doctorProfile._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this treatment' });
    }

    if (status) treatment.status = status;
    if (diagnosis) treatment.diagnosis = diagnosis;

    await treatment.save();

    // Notify Patient
    await Notification.create({
      user: treatment.patient.user._id,
      title: 'Treatment Plan Updated',
      message: `Your treatment status is now: '${treatment.status}' with diagnosis: '${treatment.diagnosis}'.`,
      type: 'system',
      emailSent: true
    });

    res.json(treatment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

module.exports = router;
