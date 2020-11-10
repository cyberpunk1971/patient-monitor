const express = require('express');

const patientControllers = require('../controllers/patients-controllers');

const router = express.Router();

router.get('/:pid', patientControllers.getPatientById);

router.get('/users/:uid', patientControllers.getPatientByUserId);

module.exports = router;

