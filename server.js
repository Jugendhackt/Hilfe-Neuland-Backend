const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('hi!');
});

const questionaires = {
	beamer: require('./questionaires/beamer.json')
};

app.get('/questionaire', (req, res) => {
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