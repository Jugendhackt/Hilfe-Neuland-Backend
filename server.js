const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { uniq } = require('lodash');

const db = require('./connectDb');
const Symptoms = require('./models/Symptoms');
const Issues = require('./models/Issues');

app.use((req, res, next) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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
	if (Array.isArray(req.body.symptoms) && req.body.symptoms.length > 0) {
		const selectedSymptoms = uniq(req.body.symptoms);
		const issues = await Issues.find().populate('symptoms');
		const symptoms = [];
		const bestIssues = [];
		issues.forEach(issue => {
			const applicableSymptoms = issue.symptoms.reduce((a, b) => {
				a += selectedSymptoms.includes(b.id) ? 1 : 0;
				return a;
			}, 0);
			
			if (applicableSymptoms > 0) {
				const remainingSymptoms = issue.symptoms.filter(symptom => !selectedSymptoms.includes(symptom.id));
				remainingSymptoms.forEach(symptom => symptoms.includes(symptom) || symptoms.push(symptom));
				bestIssues.push({ ...issue.toObject(), applicableSymptoms });
			}
		});

		const issueRelevance = bestIssues.sort((a,b) => a.applicableSymptoms < b.applicableSymptoms ? 1 : -1);

		res.json({
			symptoms,
			bestIssues: issueRelevance
		});
	}
	else {
		res.status(301).json({
			error: true,
			errorMsg: 'Invalid data.'
		});
	}
});

app.listen(3000);