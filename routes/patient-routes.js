const express = require('express');
const {requireAuth} = require('../auth/auth');
const { check } = require('express-validator');

const patientControllers = require('../controllers/patients-controllers');

const router = express.Router();

router.get('/:pid', requireAuth, patientControllers.getPatientById);

router.get('/', requireAuth, patientControllers.getPatientsByUserId);

router.post('/', requireAuth, 
    check('name')
        .not()
        .isEmpty(),
    patientControllers.addNewPatient);

router.patch('/:pid', requireAuth,
    check('name')
        .not()
        .isEmpty(),
    
    patientControllers.editPatient);

router.delete('/:pid', patientControllers.deletePatient);

module.exports = router;

