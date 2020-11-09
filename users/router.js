const express = require('express');
const path = require('path');
const UsersValidation = require('./validation');

const usersRouter = expressRouter();
const jsonBodyParser = express.json();

usersRouter
    .post('/', jsonBodyParser, (req, res, next) => {
        const { username, password, email } = req.body

        for (const field of ['user_name', 'password', 'email'])
            if (!req.body[field])
            return res.status(400).json({
                error: `Please provide a ${field} to register.`
            });
const trimmedFields = ['password', 'username'];
const nonTrimmedField = trimmedFields.find(field => {
    req.body[field].trim() !== req.body[field]
});
    if (nonTrimmedField) {
        return res.status(422).json({
            code:422,
            reason: "Validation error",
            message: "Cannot start or end with whitespace",
            location: nonTrimmedField
        });
    }

    const passwordError = UsersValidation.validatePassword(password)

    if (passwordError) 
    return res.status(400).json({
        error: passwordError
    });
    UsersValidation.hasUserWithUserName(
        username
    )
    .then(hasUserWithUserName => {
        if (hasUserWithUserName)
        return res.status(400).json({
            error: "That username already exists."
        });
        return UsersValidation.hashPassword(password)
        .then(hashedPassword => {
            const newUser = {
                username,
                email,
                password: hashedPassword
            }
        })
    })
    })