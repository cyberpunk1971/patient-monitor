const express = require('express');
const { check } = require('express-validator');

const patientControllers = require('../controllers/patients-controllers');

const router = express.Router();

router.get('/:pid', patientControllers.getPatientById);

router.get('/users/:uid', patientControllers.getPatientsByUserId);

router.post('/',
    check('firstname')
        .not()
        .isEmpty(),
    check('lastname').not().isEmpty(),
    patientControllers.addNewPatient);

router.patch('/:pid',
    check('firstname')
        .not()
        .isEmpty(),
    check('lastname').not().isEmpty(),
    patientControllers.editPatient);

router.delete('/:pid', patientControllers.deletePatient);

module.exports = router;

