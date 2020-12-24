const {v4 : uuidv4} = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const { Medication } = require('../models/medications');
const requireAuth = require('../auth/auth');
const { User } = require('../models/users');
const mongoose = require('mongoose');
const { Patient } = require('../models/patients');

const getMedicationsById = async (req, res, next) => {
    const medicationId = req.params.pid;
    let medication
    try {
        medication =  await Medication.findById(medicationId);
    } catch (err) {
        const error = new HttpError(
            "Could not find the medication.", 500
        );
        return next(error);
    }

    if (!medication) {
        const error = new HttpError(
            "Medication not found for the ID provided.", 404
        );
        return next(error);
    }
       //convert to javascript object and remove underscore from "id"
    res.json({ medication: medication.toObject({ getters: true }) });
};

const getMedicationsByPatientId = async (req, res, next) => {
    
    const userId = req.user.id;

    let medications
    try {
         medications = await Medication.find({ creator: userId });
    } catch (err) {
        const error = new HttpError(
            "Could not find medication by that user ID.", 500
        );
        return next(error);
    }

    if (!medications || medications.length === 0) {
        return next(
            new HttpError("Medications not found for current user.", 404));
    }
    //return the array of medications
    res.json(medications.map(medication => medication.toObject({ getters: true })) );
};

const addNewMedication = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const { name } = req.body;
    const newMedication = new Medication({
       name,
        creator: req.user.id
    });

    let user;

    try {
       newMedication.save();
       // pass in req.params.pid, pid comes from the route we set up in //medications-routes.js
        await Patient.findByIdAndUpdate(req.params.pid, {
            //
            $push: {
                medications: newMedication._id
            }
        });
    } catch (err) {
        const error = new HttpError(
            "Unable to save medication", 500
        )
        console.log(err);
        return next(error);
    }

    console.log(user);

   res.status(201).json({medication: newMedication});
};

const editMedication = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError("Please enter all fields.", 422);
    }
    const { name } = req.body;
    const medicationId = req.params.pid;

    let medications;
    try {
        medications = await editMedication.findById(medicationId);
    } catch (err) {
        const error = new HttpError(
            "Could not edit medication.", 500
        );
        return next(error);
    }

    medications.name = name;

   try {
       await medications.save();
   } catch (err) {
       const error = new HttpError(
           "Could not save edit.", 500
       );
       return next(error);
   }

    res.status(200).json({medication: medications.toObject({ getters: true })});
    
};

const deleteMedication = async (req, res, next) => {
    const medicationId = req.params.pid;
    
    let medication;
    try {
        medication = await Medication.findById(medicationId);
    } catch (err) {
        const error = new HttpError(
            "Could not delete medication.", 500
        );
        return next(error);
    }

    try {
        await medication.remove();
    } catch (err) {
        const error = new HttpError(
            "Could not find medication to delete.", 500
        );
        return next(error);
    }

    res.status(200).json({ message: "Patient deleted." });
};

exports.getMedicationsById = getMedicationsById;
exports.getMedicationsByPatientId = getMedicationsByPatientId;
exports.addNewMedication = addNewMedication;
exports.editMedication = editMedication;
exports.deleteMedication = deleteMedication;