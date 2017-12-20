const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
	title: String,
	options: Array,
	creator: String
});

const Poll = mongoose.model('poll', pollSchema);

module.exports = Poll;