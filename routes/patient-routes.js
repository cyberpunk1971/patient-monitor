const express = require('express');

const patientControllers = require('../controllers/patients-controllers');

const router = express.Router();

router.get('/:pid', patientControllers.getPatientById);

router.get('/users/:uid', patientControllers.getPatientByUserId);

router.post('/', patientControllers.addNewPatient);

router.patch('/:pid', patientControllers.editPatient);

router.delete('/:pid', patientControllers.deletePatient);

module.exports = router;

