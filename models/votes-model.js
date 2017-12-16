const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
	pollId: String,
	optionSelected: String
});

const Vote = mongoose.model('vote', voteSchema);

module.exports = Vote;