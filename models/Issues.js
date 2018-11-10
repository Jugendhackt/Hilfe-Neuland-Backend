const mongoose = require('mongoose');
const issuesSchema = new Schema({
	text: String,
	fix: String,
	symptoms: [{
		type: Schema.Types.ObjectId,
		ref: 'symptoms'
	}]
});
module.exports = mongoose.model('issues', issuesSchema);