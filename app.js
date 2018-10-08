require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();
const mongoSanitize = require('express-mongo-sanitize');
const RateLimit = require('express-rate-limit');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// To stop mongodb injection 
app.use(mongoSanitize());

// For logging queries
mongoose.set('debug', true);

const todoRouter = require('./routes/todoRoutes.js');
app.use('/habit', todoRouter);

switch (process.env.mode) {
    case 'development':
        process.env.PORT = process.env.DevPort;
        process.env.DATABASE = process.env.DevDatabase;
        break;
    case 'local':
        process.env.PORT = process.env.LocalPort;
        process.env.DATABASE = process.env.LocalDatabase;
        break;
    default:
        //production
        process.env.PORT = process.env.ProdPort;
        process.env.DATABASE = process.env.ProdDatabase;
        break;
}

// To prevent from brute force attack
const limiter = new RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 600, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
});

app.use(limiter);

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + process.env.DATABASE);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

if (process.env.mode != 'production') {
    console.log("MODE => " + process.env.mode);
    console.log("PORT => " + process.env.PORT);
    console.log("Database => " + process.env.DATABASE);
}


app.use((req, res, next) => {
    res.send('Wrong Url');
})
const server = app.listen(process.env.PORT, function () {
    console.log('Server is running on host ' + process.env.PORT);
})

module.exports = server;