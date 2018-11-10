const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const db = require('./connectDb');
const Symptoms = require('./models/Symptoms');
const Issues = require('./models/Issues');

app.use((req, res, next) => {
	res.set('Access-Control-Allow-Origin', '*');
	next();
});

app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', (req, res) => {
	res.send('hi!');
});

app.get('/starters', async (req, res) => {
	try {
		const starterSymptoms = await Symptoms.find({ starter: true });
		res.json(starterSymptoms);
	}
	catch (e) {
		console.error(e);
	}
});

app.post('/symptoms', async (req, res) => {
	const selectedSymptoms = req.body.symptoms;
	if (Array.isArray(selectedSymptoms) && selectedSymptoms.length > 0) {
		const issues = await Issues.find().populate('symptoms');
		const symptoms = [];
		const bestIssues = [];
		issues.forEach(issue => {
			const applicable = issue.symptoms.some(symptom => selectedSymptoms.includes(symptom.id));
			if (applicable) {
				const applicableSymptoms = issue.symptoms.filter(symptom => !selectedSymptoms.includes(symptom.id));
				applicableSymptoms.forEach(symptom => !symptoms.includes(symptom) ? symptoms.push(symptom) : null);
			}

			const { _id, text, fix } = issue;
			bestIssues.push({ _id, text, fix});
		});

		res.json({ symptoms, bestIssues });
	}
	else {
		res.status(301).json({
			error: true,
			errorMsg: 'Invalid data.'
		});
	}
});

app.listen(3000);