const mongoose = require('mongoose');

const dbURI = process.env.DB_CONNECTION_STRING;
if (!dbURI) {
	console.error('Missing env variable DB_CONNECTION_STRING, shutting down.');
	process.exit();
}

mongoose.connect(dbURI, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (e) => {
	console.error(e);
});
db.once('open', () => {
	console.log('connected');
});

module.exports = db;