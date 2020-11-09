const express = require('express');
const path = require('path');
const UsersService = require('./service');

const usersRouter = expressRouter();
const jsonBodyParser = express.json();

usersRouter
    .post('/', jsonBodyParser, (req, res, next) => {
        const { user_name, password, email } = req.body

        for (const field of ['user_name', 'password', 'email'])
            if (!req.body[field])
            return res.status(400).json({
                error: `Please provide a ${field} to register.`
            })
    })