const express = require('express');
const app = express();

const db = require('./connectDb');
const Symptoms = require('./models/Symptoms');
const Issues = require('./models/Issues');

app.use((req, res, next) => {
	res.set('Access-Control-Allow-Origin', '*');
	next();
});

app.get('/', (req, res) => {
	res.send('hi!');
});

app.get('/starter', (req, res) => {
	const set = req.query.set;
	if (Object.keys(questionaires).includes(set)) {
		res.json(questionaires[set]);
	}
	else {
		res.status(500).json({
			error: true,
			errorMsg: 'Questionaire not available'
		});
	}
});

app.listen(3000);