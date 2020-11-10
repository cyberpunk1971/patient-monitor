const HttpError = require('../models/http-error');

const DUMMY_PATIENTS = [
    {
        id: 'p1',
        firstname: 'John',
        lastname: 'Doe',
        user: 'u1'
    }
];

const getPatientById =(req, res, next) => {
    const patientId = req.params.pid;

    const patient = DUMMY_PATIENTS.find(p => {
        return p.id === patientId;
    });

    if (!patient) {
        return next(
            new HttpError("Patient not found", 404));
    }

    res.json({
        patient
    });
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

exports.getPatientById = getPatientById;
exports.getPatientByUserId = getPatientByUserId;