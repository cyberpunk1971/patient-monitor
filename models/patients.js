const mongoose = require('mongoose');


//TODO add requirements and remaining keys/values and models to model
const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
        //required: true
    },

    dob: {
        type: String
    },

    gender: {
        type: String
    },

    race: {
        type: String
    },

    address: {
        type: String
    },

    street: {
        type: String,
    },
    
    unit: {
        type: String,
    },

    city: {
        type: String,
    },

    usState: {
        type: String,
    },

    zip: {
        type: Number
    },

    phone: {
        type: Number
    },

    creator: {
        type: mongoose.Types.ObjectId,
        //required: true,
        ref: 'User'
    },

    medications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Medication'
        }
    ]
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = { Patient };