const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private (Admin and Doctors only)
router.get('/', protect, authorize(['admin', 'doctor']), async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate('user', 'name email role')
      .populate({
        path: 'assignedDoctor',
        populate: { path: 'user', select: 'name email' }
      });
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single patient
// @route   GET /api/patients/:id
// @access  Private (Admin, Doctor, or Patient themselves)
router.get('/:id', protect, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate('user', 'name email role')
      .populate({
        path: 'assignedDoctor',
        populate: { path: 'user', select: 'name email' }
      });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Authorization: Admin, Doctor, or Patient owner
    const isOwner = patient.user._id.toString() === req.user._id.toString();
    const isMedicalStaff = ['admin', 'doctor'].includes(req.user.role);

    if (!isOwner && !isMedicalStaff) {
      return res.status(403).json({ message: 'Not authorized to view this patient profile' });
    }

    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create a new patient (Admin only)
// @route   POST /api/patients
// @access  Private/Admin
router.post('/', protect, authorize(['admin']), async (req, res) => {
  const { name, email, password, age, gender, bloodType, phone, address, medicalHistory, assignedDoctor } = req.body;

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create User credential
    const user = await User.create({
      name,
      email,
      password,
      role: 'patient'
    });

    // Create Patient profile
    const patient = await Patient.create({
      user: user._id,
      age,
      gender,
      bloodType,
      phone,
      address,
      medicalHistory: medicalHistory || [],
      assignedDoctor: assignedDoctor || null
    });

    const populatedPatient = await Patient.findById(patient._id)
      .populate('user', 'name email role')
      .populate({
        path: 'assignedDoctor',
        populate: { path: 'user', select: 'name email' }
      });

    res.status(201).json(populatedPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Private (Admin, Doctor, or Patient themselves)
router.put('/:id', protect, async (req, res) => {
  const { name, email, age, gender, bloodType, phone, address, medicalHistory, assignedDoctor } = req.body;

  try {
    let patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Authorization checks
    const isOwner = patient.user.toString() === req.user._id.toString();
    const isDoctor = req.user.role === 'doctor';
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isDoctor && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    // Update User credentials (if owner or admin)
    if ((name || email) && (isOwner || isAdmin)) {
      const user = await User.findById(patient.user);
      if (user) {
        if (name) user.name = name;
        if (email) {
          const emailInUse = await User.findOne({ email, _id: { $ne: user._id } });
          if (emailInUse) {
            return res.status(400).json({ message: 'Email already in use' });
          }
          user.email = email;
        }
        await user.save();
      }
    }

    // Update Patient profile info
    if (age !== undefined) patient.age = age;
    if (gender) patient.gender = gender;
    if (bloodType) patient.bloodType = bloodType;
    if (phone) patient.phone = phone;
    if (address) patient.address = address;

    // Only Admin or Doctor can edit medicalHistory or assignedDoctor
    if (isAdmin || isDoctor) {
      if (medicalHistory) patient.medicalHistory = medicalHistory;
      if (assignedDoctor !== undefined) patient.assignedDoctor = assignedDoctor || null;
    }

    await patient.save();

    const updatedPatient = await Patient.findById(patient._id)
      .populate('user', 'name email role')
      .populate({
        path: 'assignedDoctor',
        populate: { path: 'user', select: 'name email' }
      });

    res.json(updatedPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @desc    Delete patient (Admin only)
// @route   DELETE /api/patients/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize(['admin']), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Delete credentials
    await User.findByIdAndDelete(patient.user);

    // Delete profile
    await Patient.findByIdAndDelete(req.params.id);

    res.json({ message: 'Patient and user account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
