const mongoose = require('mongoose');


//TODO add remaining keys/values to MedSchema
const MedSchema = new mongoose.Schema({
    name: {
        type: String
    },
    dosage: {
        type: String
    },
    frequency: {
        type: String
    },
    route: {
        type: String
    },
    date: {
        type: String
    }
    
});

const Medication = mongoose.model('Medication', MedSchema);

module.exports = { Medication };