const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const symptomsSchema = new Schema({
	starter: Boolean,
	text: String
});
module.exports = mongoose.model('symptoms', symptomsSchema);