const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialization: {
    type: String,
    required: [true, 'Please add a specialization'],
    trim: true
  },
  experience: {
    type: Number,
    required: [true, 'Please add years of experience']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  availability: {
    type: [String],
    default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  },
  rating: {
    type: Number,
    default: 5.0
  }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
