const mongoose = require('mongoose');

const CheckupSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  weight: Number,
  height: Number,
  bloodPressure: String,
  pulse: Number,
  notes: String
});

const FollowUpSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'missed'],
    default: 'scheduled'
  },
  notes: String
});

const TreatmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active'
  },
  diagnosis: {
    type: String,
    default: 'Awaiting diagnosis'
  },
  checkups: [CheckupSchema],
  followUps: [FollowUpSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Treatment', TreatmentSchema);
