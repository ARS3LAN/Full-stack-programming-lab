const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add medication name']
  },
  dosage: {
    type: String,
    required: [true, 'Please add dosage (e.g., 500mg)']
  },
  frequency: {
    type: String,
    required: [true, 'Please add frequency (e.g., Twice a day)']
  },
  duration: {
    type: String,
    required: [true, 'Please add duration (e.g., 7 days)']
  }
});

const PrescriptionSchema = new mongoose.Schema({
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
  treatment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Treatment',
    required: true
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  medications: [MedicationSchema],
  instructions: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
