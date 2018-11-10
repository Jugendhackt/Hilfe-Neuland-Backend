const mongoose = require('mongoose');

const issuesSchema = new mongoose.Schema({
	text: String,
	fix: String,
	symptoms: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'symptoms'
	}]
});

module.exports = mongoose.model('issues', issuesSchema);