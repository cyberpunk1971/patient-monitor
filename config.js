const dotenv = require('dotenv');
dotenv.config();

//exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://localhost/medlist';
// exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'SECRET_KEY';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '1h';


exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb+srv://localhost'