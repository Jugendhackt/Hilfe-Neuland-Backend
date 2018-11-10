const mongoose = require('mongoose');

const symptomsSchema = new mongoose.Schema({
	starter: Boolean,
	text: String
});

module.exports = mongoose.model('symptoms', symptomsSchema);