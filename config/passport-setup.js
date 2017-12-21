const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const keys = require('./auth');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(new GoogleStrategy({
	// options for google strat
	callbackURL: keys.google.callbackURL,
	clientID: keys.google.clientID,
	clientSecret: process.env.ClientSecret
}, (accessToken, refreshToken, profile, done) => {
	// Check if user exists in db
	User.findOne({googleid: profile.id}).then((currentUser) => {
		if(currentUser){
			// User Exists
			console.log('User is: ', currentUser);
			done(null, currentUser);
		} else {
			// User doesn't exists, so create a new one
			new User({
		    username: profile.displayName,
		    googleid: profile.id
	        }).save().then((newUser) => {
		      console.log('New user created: ' + newUser);
		      done(null, newUser);
	        });
		}
	});
}));
