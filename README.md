# Elasticsearch / Kibana Demo

This is the demo project assigned to Jake Peacock to show how we can use [Elasticsearch](https://www.elastic.co/) / [Kibana](https://www.elastic.co/products/kibana) as a dashboard for our data scientists.

You will find some examples of audio and linguistic features in the [examples/data folder](./examples/data). The goal is to index useful elements of this data into Elasticsearch to be used in creating a dashboard through kibana. Some challenges will include some of the audio data which has a large set of data points for each sample. One idea would be to do some basic statistical analysis on these audio features before indexing into elastic.

Please use best practice approaches in elastic. For example, the index should be kept "dry" in order to have elasticsearch perform optimally. Also please research interesting elasticsearch features to be used with the data set. For example, elasticsearch has large support for full text analysis which may be useful on the transcription data.

### Usage

To spin up the docker container..

	$ cd demo-elastic/demo/docker

	$ docker-compose up --build

To populate the indexes

	$ python uploader.py

To visualize the data.

	1. Go to: http://localhost:5601/app/kibana#/management/kibana/objects?_g=()&_a=(tab:visualizations)

	2. Click Import in the top right. Select demo-elastic/demo/docker/visualizations.json

	3. When the import finishes, the visualizations tab should have the vizualizations listed.

	4. Go to URL: http://localhost:5601/app/kibana#/visualize?_g=()

	5. Analyze Various Visualizations.


### Dependencies

docker (Download from Mac App store)

elastic-5.4.0

- Install elastic tutorial for docker: https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html

kibana-5.4.0

Node.js 
- see 'demo/docker/package.json' for all npm packages


### Next Steps

Depending on the goal of a particular data scientist, she could create a kibana dashboard that consists of a few visualizations she 
found relevant to the current dataset. For example, when looking at the effect of caffeine, an obvious feature to look at would be
words per minute (speaking speed).


### Licensing

Please use the [demo folder](./demo/) as your working folder for any code you produce. This work is licensed under [Apache 2.0](./demo/LICENSE) and is owned by you. Any code / data in the [examples folder](./examples/) is licensed to you for use in this research. Please review the [licensing](./examples/LICENSE) information first and feel free to reach out if you have any questions.

### Points of Contact
- [Drew Morris](mailto:drew@neurolex.co)
- [Jim Schwoebel](mailto:jim@neurolex.co)