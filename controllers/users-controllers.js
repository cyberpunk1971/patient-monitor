require('dotenv').config();
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
//const {v4 : uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');
const config = require('../config');
const HttpError = require('../models/http-error');

const { User } = require('../models/users');

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(
            new HttpError("Please enter all fields.", 422)
        );
    }
    const { username, email, password } = req.body;

    let userExists;
    try {
        userExists = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            "Registration failed.",
            500
        );
        return next(error);
    }

    if (userExists) {
        const error = new HttpError(
            "User already exists, please login.",
            422
        );
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError(
            'Could not create user',
            500
        );
        return next(error);
    }

    const newUser = new User({
        //id: uuidv4(),
        username,
        email,
        password: hashedPassword,
        patients: []
    });

    try {
        await newUser.save();
    } catch (err) {
        return next(makeError(err, "Could not register new user"));
    }

    let token;
    try {
        token = jwt.sign({ userId: newUser.id, email: newUser.email }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRY });
    } catch (err) {
        const error = new HttpError(
            'Could not validate password, please try again.',
            500
        );
        console.log(error);
        return next(error);
    }

    res.status(201)
        .json({
            user: newUser.id, email: newUser.email, token: token
        });
};


const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    let userExists;

    try {
        userExists = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            'Login failed, that email is already in use.',
            500
        );
        return next(error);
    }

    if (!userExists) {
        const error = new HttpError(
            'Login failed, bad password.',
            401
        );
        return next(error);
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, userExists.password);
    } catch (err) {
        const error = new HttpError(
            'Invalid password.',
            500
        );
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError(
            'Login failed, bad password or user already exists.',
            401
        );
        return next(error);
    }
    let token;
    try {
        token = jwt.sign({
            userId: userExists.id,
            email: userExists.email
        },
            config.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRY }
        );
    } catch (err) {
        const error = new HttpError(
            'Could not validate password, please try again.',
            500
        );
        return next(error);
    }

    res.json({
        userId: userExists.id,
        email: userExists.email,
        username: userExists.username,
        token: token
    });
};

const makeError = (err, msg) => {
    const error = new HttpError(
        msg, 500
    );
    console.log(err);
    return error;
}
//exports.getUsers = getUsers;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
