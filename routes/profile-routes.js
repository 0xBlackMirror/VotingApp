const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Poll = require('../models/poll-model');

const authCheck = (req, res, next) => {
	if(!req.user){
		res.redirect('/auth/login');
	} else {
		next();
	}
}

router.get('/', authCheck, (req, res) => {
	let profileName = req.user.username;
	Poll.find({creator: profileName}, (err, polls) => {
		res.render('profile', {user: req.user, polls: polls});
	});
});

module.exports = router;