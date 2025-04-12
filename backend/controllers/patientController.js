const Patient = require('../models/Patient');

// Get patient details
exports.getPatientDetails = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update patient health data
exports.updatePatientHealthData = async (req, res) => {
  try {
    const { bloodPressure, bloodSugar, heartRate, weight, medicationAdherence } = req.body;
    
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { bloodPressure, bloodSugar, heartRate, weight, medicationAdherence },
      { new: true }
    );
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all patients (for doctor's dashboard)
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ lastVisit: -1 });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};