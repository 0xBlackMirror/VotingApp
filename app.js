// Basic Node Requires
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Express App
const app = express();
const router = express.Router();
// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Mongoose Setup
mongoose.connect('mongodb://localhost/votingapp');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Successfully Connected To The Database.')
});
// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Apply Routes To '/'
app.use('/', router);
// HomePage
router.get('/', (req, res) => {
  res.render('home');
});
// Server Start
app.listen(process.env.PORT || 4000, () => {
	console.log('Server Is Online');
});