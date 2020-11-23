const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

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
    role: {
        default: 'admin',
        type: String,
        required: true
    },
    patients: [
        {type: mongoose.Schema.Types.ObjectId,
         ref: 'Patient'
        }
    ]
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('User', UserSchema);

module.exports = { User };

//Adding the "patients" as an array, to the UserSchema, allows each
//user to have multiple patients