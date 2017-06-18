# Elasticsearch / Kibana Demo

This is the demo project assigned to Jake Peacock to show how we can use [Elasticsearch](https://www.elastic.co/) / [Kibana](https://www.elastic.co/products/kibana) as a dashboard for our data scientists.

You will find some examples of audio and linguistic features in the [examples/data folder](./examples/data). Your goal is to index useful elements of this data into Elasticsearch to be used in creating a dashboard through kibana. Some challenges will include some of the audio data which has a large set of data points for each sample. One idea would be to do some basic statistical analysis on these audio features before indexing into elastic.

Please use best practice approaches in elastic. For example, the index should be kept "dry" in order to have elasticsearch perform optimally. Also please research interesting elasticsearch features to be used with the data set. For example, elasticsearch has large support for full text analysis which may be useful on the transcription data.

### Usage

$ cd demo-elastic/demo/docker
$ docker-compose up --build

To test
$ python uploader.py

### Outline

Create Docker image for simulating a deployed instance of elasticsearch/kibana. 

The docker instance will be an Express server that acts as a wrapper client (custom to neurolex) for RESTful interaction
with the elastic cluster. Kibana dashboards will be accessible directly.

Engineer who checks out repo should be able to compose and spin up docker instance and then send and receive documents 
via HTTP requests.

Example Use case:

User POSTs full JSON document of an analyzed audio sample to endpoint (named "LexIndex" for now) (on docker instance)

Express route handles request by parsing document and creating an indexable "view" of the original document.
- calculate std, mean, etc. from arrays like linguistics.ZCR

Use elastic.js client to then POST new document(s) to elastic indices

### TODOS

- create custom Dockerfile for spinning up elasticsearch node(s) in Docker
- add kibana image and instance to docker-compose.yml


### Plan of Attack

Figure out node_modules management. Currently app can't seem to find body parser.. Maybe move up a directory

Create Express server that can be spun up on a docker instance - DONE
Configure on docker compose for elastic/kibana instances to start - DONE

Create basic CRUD endpoints on server that proxy to elastic cluster using elastic.js client - NEXT

Create layer to derive new features from original full sample and ouput indexable documents

Create kibana dashboards based on what queries will be valuable to data scientists 


### Elastic Indices

Probably would be a good idea to separate indices into text/numerical indices for starters
Potentially also split up between audio and linguistic features


### Dependencies

docker (Download from Mac App store)

elastic-5.4.0

- Install elastic tutorial for docker: https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html

kibana-5.4.0

Node.js
- express.js ($ npm install express)
- elasticsearch.js ($ npm install elastic)



### Licensing

Please use the [demo folder](./demo/) as your working folder for any code you produce. This work is licensed under [Apache 2.0](./demo/LICENSE) and is owned by you. Any code / data in the [examples folder](./examples/) is licensed to you for use in this research. Please review the [licensing](./examples/LICENSE) information first and feel free to reach out if you have any questions.

### Points of Contact
- [Drew Morris](mailto:drew@neurolex.co)
- [Jim Schwoebel](mailto:jim@neurolex.co)