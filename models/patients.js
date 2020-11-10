const mongoose = require('mongoose');


//TODO add requirements and remaining keys to model
const PatientSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    middlename: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: true,
    },
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