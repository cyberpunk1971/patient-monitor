const mongoose = require('mongoose');


//TODO add remaining keys/values to MedSchema
const MedSchema = new mongoose.Schema({
    name: {
        type: String
    }
    
});

const Medication = mongoose.model('Medications', MedSchema);

module.exports = { Medication };