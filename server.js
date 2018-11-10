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

app.get('/starter', async (req, res) => {
	try {
		const starterSymptoms = await Symptoms.find({ starter: true });
		res.json(starterSymptoms);
	}
	catch (e) {
		console.error(e);
	}
});

app.listen(3000);