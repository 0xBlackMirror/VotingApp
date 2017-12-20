const router = require('express').Router();
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Poll = require('../models/poll-model');
const flash = require('connect-flash');
const session = require('express-session');

// Express Session Middleware
router.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));

// Express Messages Middleware
router.use(require('connect-flash')());
router.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
// New Vote Form GET Request
router.get('/vote', (req, res) => {
	res.render('new-vote', {user: req.user, message2: req.flash('alert')});
});
// New Vote Check And Submit
router.post('/vote', (req, res) => {
	let optionsField = req.body.voteOptions;
	let optionsArr = optionsField.split(',');
	// Check If There Is Atleast 2 Options
	if(optionsArr.length < 2){
		req.flash('alert', 'The vote is not valid. Make sure you have more than one option and no empty spaces.');
		res.redirect(301, '/new/vote');
	} else {
		// Saves The Vote To The DB
		let newPoll = new Poll({
			title: req.body.voteTitle,
			options: optionsArr,
			creator: req.user.username
		}).save().then((vote) => {
			console.log('Vote has been successfully created!');
			req.flash('success', 'Vote has been successfully created!');
			res.redirect(301, '/');
		});
	}
});

module.exports = router;