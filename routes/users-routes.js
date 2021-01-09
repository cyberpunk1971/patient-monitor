const express = require('express');
const { check } = require('express-validator');

const { requireAuth} = require('../auth/auth');
const usersControllers = require('../controllers/users-controllers');

const router = express.Router();

//router.get('/', usersControllers.getUsers);

//router.get('/users/:uid', patientControllers.getPatientsByUserId);

router.post('/register', 
check('username').not().isEmpty(),
check('email').not().isEmpty().normalizeEmail().isEmail(),
check('password').not().isEmpty().isLength({ min: 8, max: 72}),
usersControllers.registerUser);

router.post('/login', 
check('email').not().isEmpty(),
check('password').not().isEmpty(),
usersControllers.loginUser);

router.post('/refresh', requireAuth, usersControllers.refreshUser)


module.exports = router;

