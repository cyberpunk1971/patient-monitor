const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const { Physician } = require('../models/physician');
const requireAuth = require('../auth/auth');
const { User } = require('../models/users');
const mongoose = require('mongoose');
const { Patient } = require('../models/patients');

const getPhysiciansById = async (req, res, next) => {
    const physicianId = req.params.pid;
    let physician
    try {
        physician = await Physician.findById(physicianId);
    } catch (err) {
        const error = new HttpError(
            "Could not find that physician.", 500
        );
        return next(error);
    }

    if (!physician) {
        const error = new HttpError(
            "Physician not found for the ID provided.", 404
        );
        return next(error);
    }
    //convert to javascript object and remove underscore from "id"
    res.json({ physician: physician.toObject({ getters: true }) });
};

const getPhysiciansByPatientId = async (req, res, next) => {

    const userId = req.user.id;

    let physicians
    try {
        physicians = await Physician.find({ creator: userId });
    } catch (err) {
        const error = new HttpError(
            "Could not find physician by that user ID.", 500
        );
        return next(error);
    }

    if (!physicians || physicians.length === 0) {
        return next(
            new HttpError("Physicians not found for current user.", 404));
    }
    //return the array of medications
    res.json(physicians.map(physician => physician.toObject({ getters: true })));
};

const addNewPhysician = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const { name, npi, address, unit, city, usState, zip, phone, fax } = req.body;
    const newMedication = new Medication({
        name,
        npi, 
        address, 
        unit, 
        city, 
        usState, 
        zip, 
        phone, 
        fax,
        creator: req.user.id
    });

    let user;

    try {
        newPhysician.save();
        // pass in req.params.pid, pid comes from the route we set up in //medications-routes.js
        await Patient.findByIdAndUpdate(req.params.pid, {
            //
            $push: {
                physicians: newPhysician._id
            }
        });
    } catch (err) {
        const error = new HttpError(
            "Unable to save physician", 500
        )
        console.log(err);
        return next(error);
    }

    console.log(user);

    res.status(201).json({ physician: newPhysician });
};

const editPhysician = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError("Please enter all fields.", 422);
    }
    const { name } = req.body;
    const physicianId = req.params.pid;

    let physicians;
    try {
        physicians = await Physician.findById(physicianId);
    } catch (err) {
        const error = new HttpError(
            "Could not edit record.", 500
        );
        return next(error);
    }

    physicians.name = name;

    try {
        await physicians.save();
    } catch (err) {
        const error = new HttpError(
            "Could not save edit.", 500
        );
        return next(error);
    }

    res.status(200).json({ physician: physicians.toObject({ getters: true }) });

};

const deletePhysician = async (req, res, next) => {
    const patientId = req.params.pid;
    const physicianId = req.params.mid;
    let patient;
    let physician;
    try {
        patient = await Patient.findByIdAndUpdate(patientId, {
            $pull: {
                physicians: physicianId
            }
        });
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            "Could not delete physician.", 500
        );
        return next(error);
    }
    res.status(200).json({ message: "Medication deleted." });
};

exports.getPhysiciansById = getPhysiciansById;
exports.getPhysiciansByPatientId = getPhysiciansByPatientId;
exports.addNewPhysician = addNewPhysician;
exports.editPhysician = editPhysician;
exports.deletePhysician = deletePhysician;