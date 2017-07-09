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

// parse various different custom JSON types as JSON
app.use(bodyParser.json({limit:'5mb'}))
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

app.get('/', function (req, res) {
  res.send('Hello world\n');
});

/**

*/
app.post('/saveSample', jsonParser, function (req, res) {

	var respLing = client.indexLing(req.body.features.linguistic,
									req.body.recording_id,
									req.body.transcript,
									req.body.name)

	var respAudio = client.indexAudio(req.body.features.audio,
									req.body.recording_id,
									req.body.name)

	if (!respLing){
		console.log('Ling index not created.');
		res.status = 500;
	} else if (!respAudio) {
		console.log('Audio index not created.');
		res.status = 500;
	} else {
		res.status = 200;
	}
	res.send("Responses\n" + respLing + "\n" + respAudio);
})

app.get('/getSample', function (req, res) {
	client.getSample(req.query.id, req.query.type, function(resp) {
		res.send(resp);
	});
	
})

app.get('/init', function (req, res) {
	console.log(client.init());
	res.send("Success");
})

//app.get('/getFeatureById')

//app.get('/search') //elastic will directly be able to do searches rather than having to proxy them here

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);