const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const { protect } = require('../middleware/auth');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'hlapp_jwt_secret_key_2026_spring', {
    expiresIn: '30d'
  });
};

// @desc    Register a new user (Admin, Doctor, Patient)
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password, role, extraInfo } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create User
    const userRole = role || 'patient';
    const user = await User.create({
      name,
      email,
      password,
      role: userRole
    });

    // Create corresponding Doctor or Patient profile if applicable
    if (userRole === 'patient') {
      const patientData = extraInfo || {};
      await Patient.create({
        user: user._id,
        age: patientData.age || 30,
        gender: patientData.gender || 'Male',
        bloodType: patientData.bloodType || 'O+',
        phone: patientData.phone || '000-000-0000',
        address: patientData.address || 'Default Address',
        medicalHistory: patientData.medicalHistory || []
      });
    } else if (userRole === 'doctor') {
      const doctorData = extraInfo || {};
      await Doctor.create({
        user: user._id,
        specialization: doctorData.specialization || 'General Physician',
        experience: doctorData.experience || 3,
        phone: doctorData.phone || '000-000-0000',
        availability: doctorData.availability || ['Monday', 'Wednesday', 'Friday'],
        rating: 5.0
      });
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user email, select password explicitly
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    let profileDetails = null;

    if (user.role === 'patient') {
      profileDetails = await Patient.findOne({ user: user._id }).populate('assignedDoctor');
    } else if (user.role === 'doctor') {
      profileDetails = await Doctor.findOne({ user: user._id });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profile: profileDetails
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
