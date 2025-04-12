const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  conditions: {
    type: [String],
    required: true
  },
  lastVisit: {
    type: Date,
    default: Date.now
  },
  medications: {
    type: [String],
    required: true
  },
  allergies: {
    type: [String],
    default: []
  },
  bloodPressure: String,
  bloodSugar: String,
  heartRate: String,
  weight: String,
  medicationAdherence: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Patient', PatientSchema);