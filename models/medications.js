const mongoose = require('mongoose');


//TODO add remaining keys/values to MedSchema
const MedSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: false
    },
    genericName: {
        type: String,
        required: false
    },
    
});

const Medication = mongoose.model('Medications', MedSchema);

module.exports = { Medication };