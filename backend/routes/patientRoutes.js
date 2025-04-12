const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Get patient details
router.get('/:id', patientController.getPatientDetails);

// Update patient health data
router.put('/:id/health', patientController.updatePatientHealthData);

// Get all patients
router.get('/', patientController.getAllPatients);

module.exports = router;