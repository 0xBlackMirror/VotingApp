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
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Successfully Connected To The Database.')
});