const mongoose = require('mongoose');

const PhysicianSchema = new mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    unit: {
        type: String
    },
    city: {
        type: String
    },
    usState: {
        type: String
    },
    zip: {
        type: String
    },
    phone: {
        type: String
    },
    fax: {
        type: String
    },
    NPI: {
        type: String
    }
    
});

const Physician = mongoose.model('Physician', PhysicianSchema);

module.exports = { Physician };