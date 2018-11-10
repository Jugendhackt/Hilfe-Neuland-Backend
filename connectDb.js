const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/neuland');
const db = mongoose.connection;

db.on('error', (e) => {
	console.error(e);
});
db.once('open', () => {
	console.log('connected');
});

module.exports = db;