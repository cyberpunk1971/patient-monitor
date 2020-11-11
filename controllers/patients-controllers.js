const {v4 : uuidv4} = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const {Patient} = require('../models/patients');


let DUMMY_PATIENTS = [
    {
        id: uuidv4(),
        firstname: 'John',
        middlename: "J",
        lastname: 'Doe',
        age: 42,
        user: 'u1'
    }
];

const getPatientById = (req, res, next) => {
    const patientId = req.params.pid;

    const patient = DUMMY_PATIENTS.find(p => {
        return p.id === patientId;
    });

    if (!patient) {
        return next(
            new HttpError("Patient not found", 404));
    }

    res.json({ patient });
};

const getPatientsByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const patients = DUMMY_PATIENTS.filter(p => {
        return p.user === userId;
    });

    if (!patients || patients.length === 0) {
        return next(
            new HttpError("Patients not found for current user.", 404));
    }
    res.json({ patients });
};

const addNewPatient = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError("Please enter all fields.", 422);
    }

    const { firstname, lastname, age } = req.body;
    const newPatient = new Patient({
        firstname,
        lastname
    });
    
    try {
        await newPatient.save();
    } catch (err) {
        const error = new HttpError("Failed to create new patient.", 500);
        return next(error);
    }

   res.status(201).json({patient: newPatient});
};

const editPatient = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError("Please enter all fields.", 422);
    }
    const { firstname, lastname, age } = req.body;
    const patientId = req.params.pid;

    const updatePatient = { ...DUMMY_PATIENTS.find(p => p.id === patientId)};
    const patientIndex = DUMMY_PATIENTS.findIndex(p => p.id === patientId);
    updatePatient.firstname = firstname;
    updatePatient.lastname = lastname;
    updatePatient.age = age;

    DUMMY_PATIENTS[patientIndex] = updatePatient;

    res.status(200).json({patient: updatePatient});
    
};

const deletePatient = (req, res, next) => {
    const patientId = req.params.pid;
    DUMMY_PATIENTS = DUMMY_PATIENTS.filter(p => p.id !== patientId);
    res.status(200).json({ message: "Patient deleted." });
};

exports.getPatientById = getPatientById;
exports.getPatientsByUserId = getPatientsByUserId;
exports.addNewPatient = addNewPatient;
exports.editPatient = editPatient;
exports.deletePatient = deletePatient;