const {v4 : uuidv4} = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const { Patient } = require('../models/patients');
const requireAuth = require('../auth/auth');
const { User } = require('../models/users');
const mongoose = require('mongoose');

const getPatientById = async (req, res, next) => {
    const patientId = req.params.pid;
    let patient
    try {
        patient =  await Patient.findById(patientId);
    } catch (err) {
        const error = new HttpError(
            "Could not find the patient.", 500
        );
        return next(error);
    }

    if (!patient) {
        const error = new HttpError(
            "Patient not found for the ID provided.", 404
        );
        return next(error);
    }
       //convert to javascript object and remove underscore from "id"
    res.json({ patient: patient.toObject({ getters: true }) });
};

const getPatientsByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let patients
    try {
         patients = await Patient.find({ creator: userId });
    } catch (err) {
        const error = new HttpError(
            "Could not find patient by that user ID.", 500
        );
        return next(error);
    }

    if (!patients || patients.length === 0) {
        return next(
            new HttpError("Patients not found for current user.", 404));
    }
    res.json({ patients: patients.map(patient => patient.toObject({ getters: true })) });
};

const addNewPatient = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const { name, age, gender, race } = req.body;
    const newPatient = new Patient({
       name,
        age,
        gender,
        race,
        medications: [],
        creator: req.user.id
    });

    let user;

    try {
       newPatient.save();

    } catch (err) {
        const error = new HttpError(
            "Unable to save patient", 500
        )
        return next(error);
    }

    console.log(user);

   res.status(201).json({patient: newPatient});
};

const editPatient = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError("Please enter all fields.", 422);
    }
    const { firstname, lastname, age } = req.body;
    const patientId = req.params.pid;

    let patients;
    try {
        patients = await Patient.findById(patientId);
    } catch (err) {
        const error = new HttpError(
            "Could not edit patient.", 500
        );
        return next(error);
    }

    patients.firstname = firstname;
    patients.lastname = lastname;
    patients.age = age;

   try {
       await patients.save();
   } catch (err) {
       const error = new HttpError(
           "Could not save edit.", 500
       );
       return next(error);
   }

    res.status(200).json({patient: patients.toObject({ getters: true })});
    
};

const deletePatient = async (req, res, next) => {
    const patientId = req.params.pid;
    
    let patient;
    try {
        patient = await Patient.findById(patientId);
    } catch (err) {
        const error = new HttpError(
            "Could not delete patient.", 500
        );
        return next(error);
    }

    try {
        await patient.remove();
    } catch (err) {
        const error = new HttpError(
            "Could not find patient to delete.", 500
        );
        return next(error);
    }

    res.status(200).json({ message: "Patient deleted." });
};

exports.getPatientById = getPatientById;
exports.getPatientsByUserId = getPatientsByUserId;
exports.addNewPatient = addNewPatient;
exports.editPatient = editPatient;
exports.deletePatient = deletePatient;