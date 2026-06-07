const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  age: {
    type: Number,
    required: [true, 'Please add age']
  },
  gender: {
    type: String,
    required: [true, 'Please add gender'],
    enum: ['Male', 'Female', 'Other']
  },
  bloodType: {
    type: String,
    required: [true, 'Please add blood type']
  },
  phone: {
    type: String,
    required: [true, 'Please add phone number']
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  medicalHistory: {
    type: [String],
    default: []
  },
  assignedDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    default: null
  }
});

module.exports = mongoose.model('Patient', PatientSchema);
