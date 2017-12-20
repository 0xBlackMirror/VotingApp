// Basic Node Requires
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const newRoutes = require('./routes/new-routes');
const voteRoutes = require('./routes/vote-routes');
const deleteRoutes = require('./routes/delete-routes');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const keys = require('./config/auth');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const Poll = require('./models/poll-model');
// Express App
const app = express();
// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cookie Middlware
app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys: [process.env.cookieKey]
}));
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
// Express Session Middleware
app.use(session({
    secret: process.env.CookieSecret,
    resave: true,
    saveUninitialized: true
  }));
// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
// Mongoose Setup
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Successfully Connected To The Database.')
});
// Set Up Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/new', newRoutes);
app.use('/poll', voteRoutes);
app.use('/delete', deleteRoutes);
// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// HomePage
app.get('/', (req, res) => {
  Poll.find({}, (err, polls) => {
  	if(err){
  		console.log(err);
  	} else {
  		//console.log(votes[0]);
  		res.render('home', {
  		 user: req.user,
  		 message1: req.flash('success'),
  		 voteSuccess: req.flash('voteSuccess'),
  		 delSuccess: req.flash('delSuccess'),
  		 polls: polls
  		});
  	}
  });
});
// Server Start
app.listen(process.env.PORT || 3000, () => {
	console.log('Server Is Online');
});