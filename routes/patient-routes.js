const express = require('express');
const {requireAuth} = require('../auth/auth');
const { check } = require('express-validator');

const patientControllers = require('../controllers/patients-controllers');

const router = express.Router();

router.get('/:pid', patientControllers.getPatientById);

router.get('/users/:uid', patientControllers.getPatientsByUserId);

router.post('/', requireAuth, 
    check('name')
        .not()
        .isEmpty(),
    patientControllers.addNewPatient);

router.patch('/:pid', requireAuth,
    check('firstname')
        .not()
        .isEmpty(),
    check('lastname').not().isEmpty(),
    patientControllers.editPatient);

router.delete('/:pid', patientControllers.deletePatient);

module.exports = router;

