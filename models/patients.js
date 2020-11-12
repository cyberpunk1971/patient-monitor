const mongoose = require('mongoose');


//TODO add requirements and remaining keys/values and models to model
const PatientSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    middlename: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    creator: [
        {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    ],
    medications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Medications'
        }
    ]
    // address: {
    //     number: {
    //         number: String
    //     },
    //     street: {
    //         type: String,

    //     },
    //     city: {
    //         type: String,
    //     },
    //     unit: {
    //         type: String,
    //     },
    //     state: {
    //         type: String,
    //     },
    //     zip: {
    //         type: Number
    //     }
    // }
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = { Patient };