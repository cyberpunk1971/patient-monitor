const {v4 : uuidv4} = require('uuid');
const HttpError = require('../models/http-error');

const DUMMY_PATIENTS = [
    {
        id: 'p1',
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

const getPatientByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const patient = DUMMY_PATIENTS.find(p => {
        return p.user === userId;
    });

    if (!patient) {
        return next(
            new HttpError("Patient not found for current user.", 404));
    }
    res.json({ patient });
};

const addNewPatient = (req, res, next) => {
    const { firstname, lastname, age, user } = req.body;
    const newPatient = {
        id: uuidv4(),
        firstname,
        lastname,
        age,
        user
    };
    DUMMY_PATIENTS.push(newPatient);

    res.status(201).json({patient: newPatient});
};

const editPatient = (req, res, next) => {
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

};

exports.getPatientById = getPatientById;
exports.getPatientByUserId = getPatientByUserId;
exports.addNewPatient = addNewPatient;
exports.editPatient = editPatient;
exports.deletePatient = deletePatient;