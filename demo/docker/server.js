'use strict';
console.log('start server.js');

const express = require('express');

var morgan = require('morgan');

var client = require('./elastic.js');

var bodyParser = require('body-parser');

// Constants
var PORT = 8080;

// App
var app = express();

// create application/json parser
var jsonParser = bodyParser.json();

console.log('got here');
// parse various different custom JSON types as JSON
app.use(bodyParser.json({}))

console.log('maybe here');


app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.post('/saveSample', jsonParser, function (req, res) {
	console.log('got here lit')
	console.log(req);
	console.log(req.body);
	console.log(req.body.recording_id);

	// moran.log(req);
	client.indexTest();

	var respAll = client.indexAll(req.body, req.body.recording_id);

	// var respName = client.indexMetaData(req.body.name,
	// 									 req.body.email, 
	// 									 req.body.transcript, 
	// 									 req.body.recording_id)

	// var respAudio = client.indexAudio(req.body.features.audio, req.body.recording_id)

	// var respLing = client.indexLing(req.body.features.linguistic, req.body.recording_id)


	res.status = 200;
	res.send(respAll);
})

//app.get('/getFeatureById')

//app.get('/search') //elastic will directly be able to do searches rather than having to proxy them here

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);