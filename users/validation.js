const bcrypt = require('bcryptjs');
const xss = require('xss');
const { User } = require('./models');
//const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UsersService = {
    hasUserNameWith(username) {
        return User
        .findOne({username})
        .then(user => !!user)
    },
    insertUser(newUser) {
        return User
        .create(newUser)
    },
    validatePassword(password) {
        if (password.length < 8) {
            return "Password must be longer than 8 characters."
        }
        if (password.length > 72) {
            return "Password must not be longer than 72 characters."
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return "Password cannot start or end with whitespace."
        }
        return null
    },
    hashPassword(password) {
        return bcrypt.hash(password, 12)
    },
    serializeUser(user) {
        return {
            id: user.id,
            username: xss(user.username),
            email: xss(user.email)
        }
    },
}

module.exports = UsersService;