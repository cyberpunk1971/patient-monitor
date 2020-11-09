const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 72
    },
    patients: [
        {type: mongoose.Schema.Types.ObjectId,
         ref: 'Patient'
        }
    ]
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };