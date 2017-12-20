const router = require('express').Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Poll = require('../models/poll-model');
const Vote = require('../models/votes-model');
const flash = require('connect-flash');
const session = require('express-session');
// Poll Delete POST Request
router.post('/:id', (req, res) => {
	let PollId = req.params.id;
	Poll.findOne({_id: PollId}, (err, poll) => {
		if(req.user.username == poll.creator){
			Vote.remove({pollId: PollId}, (err) => {
				if(err) throw err;
			});
			Poll.remove({_id: PollId}, (err) => {
				if(err) throw err;
			});
		}
	}).then(() => {
		  req.flash('delSuccess', 'Poll Has Been Deleted Successfully.');
		  res.redirect('/');
	});
});

module.exports = router;
