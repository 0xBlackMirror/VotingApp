// Basic Node Requires
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Express App
const app = express();
// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Mongoose Setup
mognoose.connect('mongodb://localhost/votingapp');
const db = mongoose.connection;