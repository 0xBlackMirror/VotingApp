const router = require('express').Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Poll = require('../models/poll-model');
const Vote = require('../models/votes-model');
const flash = require('connect-flash');
const session = require('express-session');

// Vote Interface
router.get('/:id', (req, res) => {
	let pollId = req.params.id;
	Poll.findById(pollId, (err, poll) => {
		if(err) throw err;
		Vote.find({pollId: pollId}, (err, votes) => {
			res.render('vote', {user: req.user, poll: poll, voteFail: req.flash('voteFail'),votes: JSON.stringify(votes)});
			//console.log(votes);
		});
	});
});
// Vote POST Request
router.post('/:id', (req, res) => {
	let optionSelected = req.body.option;
	//console.log(optionSelected);
	if(optionSelected == undefined){
		req.flash('voteFail', 'Please Select An Option To Submit.');
		res.redirect(req.header('Referer'));
	} else {
		let newVote = new Vote({
			pollId: req.params.id,
			optionSelected: optionSelected
		}).save().then((vote) => {
			console.log('Vote has been successfully added to the database.');
			req.flash('voteSuccess', 'Thank You For Voting!');
			res.redirect(301, '/');
		});
	}
});

module.exports = router;