require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {PORT, DATABASE_URL} = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.use(express.json({extended: false}));

let server;

function runServer() {
    return new Promise((resolve, reject) => {
        mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, err => {
            if (err) {
                return reject(err);
            }
            
            server = app.listen(PORT, () => {
                console.log(`Your server is listening on port ${PORT}`);
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
