require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {PORT, DATABASE_URL} = require('./config');

const HttpError = require('./models/http-error');

const medicationsRoutes = require('./routes/medications-routes');
const patientsRoutes = require('./routes/patient-routes');
const usersRoutes = require('./routes/users-routes');


const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.use(express.json({extended: false}));


//Users route
app.use('/api/users', usersRoutes);

//Patient route
app.use('/api/patients', patientsRoutes);

//Medication route
app.use('/api/medications', medicationsRoutes);

//Error handling for unsupported routes
app.use((req, res, next) => {
    const error = new HttpError('Unsupported route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        message: error.message || 'An unknown error occurred.'
    });
});

let server;

function runServer() {
    return new Promise((resolve, reject) => {
        mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, err => {
            if (err) {
                return reject(err);
            }
            
            server = app.listen(PORT, () => {
                console.log(`The server is listening on port ${PORT}`);
                resolve();
            })
            .on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}
function closeServer() {
    return new Promise((resolve, reject) => {
        mongoose.disconnect()
        .then(() => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}
if (require.main === module) {
    runServer()
    .catch(err => console.error(err));
}
module.exports = { app, runServer, closeServer};
