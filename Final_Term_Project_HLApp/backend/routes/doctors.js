const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('user', 'name email role');
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('user', 'name email role');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create new doctor (Admin only)
// @route   POST /api/doctors
// @access  Private/Admin
router.post('/', protect, authorize(['admin']), async (req, res) => {
  const { name, email, password, specialization, experience, phone, availability } = req.body;

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create credential user
    const user = await User.create({
      name,
      email,
      password,
      role: 'doctor'
    });

    // Create doctor profile
    const doctor = await Doctor.create({
      user: user._id,
      specialization,
      experience,
      phone,
      availability: availability || ['Monday', 'Wednesday', 'Friday']
    });

    const populatedDoctor = await Doctor.findById(doctor._id).populate('user', 'name email role');
    res.status(201).json(populatedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @desc    Update doctor
// @route   PUT /api/doctors/:id
// @access  Private (Admin or Doctor themselves)
router.put('/:id', protect, async (req, res) => {
  const { name, email, specialization, experience, phone, availability, rating } = req.body;

  try {
    let doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    // Check permissions: must be admin or the doctor user themselves
    const isOwner = doctor.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    // Update User model (name & email) if requested and authorized (Admin or Owner)
    if (name || email) {
      const user = await User.findById(doctor.user);
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

    // Update Doctor profile fields
    if (specialization) doctor.specialization = specialization;
    if (experience !== undefined) doctor.experience = experience;
    if (phone) doctor.phone = phone;
    if (availability) doctor.availability = availability;
    if (rating !== undefined && isAdmin) doctor.rating = rating; // Only admin can edit ratings

    await doctor.save();

    const updatedDoctor = await Doctor.findById(doctor._id).populate('user', 'name email role');
    res.json(updatedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @desc    Delete doctor (Admin only)
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize(['admin']), async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Delete associated User
    await User.findByIdAndDelete(doctor.user);

    // Delete Doctor profile
    await Doctor.findByIdAndDelete(req.params.id);

    res.json({ message: 'Doctor and user account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
