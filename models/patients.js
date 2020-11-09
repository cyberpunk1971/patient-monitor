const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: String,
    },
    lastName: {
        type: String,
        required: String,
    },
    address: {
        number: {
            number: String
        },
        street: {
            type: String,
            
        },
        city: {
            type: String,
        },
        unit: {
            type: String,
        },
        state: {
            type: String,
        },
        zip: {
            type: Number
        }
    }
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = { Patient };