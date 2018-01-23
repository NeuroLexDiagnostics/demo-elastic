var elasticsearch = require('elasticsearch');
var stats = require('statistics');
var async = require('async');
require('dotenv').config({ silent: true })
var client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH
});


//Begin module function definitions
module.exports = {

  init : function() {

    indexExists().then(function (exists) {
        if (exists) {
            console.log("Deleting index");
            return deleteIndex();
        }
    }).then(initIndex).then(initMappings).then(function() {
        client.ping({
          requestTimeout: 30000,
        }, function (error) {
          if (error) {
            console.error(error)
            console.error("elasticsearch cluster is down!");
            return false;
          } else {
            console.log("All is well");
            return true;
          }
        });
    });

    return "Successful Init index";
  },
  /* Temp function to test indexing entire document */
  indexAll: function (document, id) {
    console.log("Handling sample, id:" + id);

	  return "Success."
  },

  /* Index the raw audio features of the sample */
  indexAudio: function(audio, id, name) {

  	indexable = {};
  	//Create new indexable document that starts with just the id and then we will add derived features to be indexed.

    async.forEachOf(audio, function(data, key, callback) {

      var _stats = {};

      if (key == 'chroma_vector' || key == 'MFCC') {
        _stats.stdev = [];
        _stats.mean = [];

        for (var i = 0; i < data.length; i++) {
          frame_stats = get_stats(data[i]);
          _stats.stdev.push(frame_stats.stdev);
          _stats.mean.push(frame_stats.mean);
        }

      } else {
        _stats = get_stats(data, callback);
      }

      var field_std = key + "_std";
      var field_mean = key + "_mean";
      indexable[field_std] = _stats.stdev;
      indexable[field_mean] = _stats.mean;   
      
    }, function(err){
      if (err) {
        console.log(err);
      }
    });

  	return client.create({
      index: 'features',
      type: 'audio',
      id: id,
      body: {
        name : name,
        data : indexable
      }
    }, function (error, response) {
      if (error) {
        console.log(error);
      } else {
        return response.created;
      }
    });

  },

  /* Index the derived linguistic features of the sample */
  indexLing: function(ling_data, id, transcript, name) {


    if (!ling_data) {
      console.log("No ling data. Fine.");
      return "Skipping!";
    }
    
    console.log(ling_data)
    console.log(id)

    return client.create({
      index: 'features',
      type: 'linguistic',
      id: id,
      body: {
        name : name,
        data : ling_data,
        transcript :transcript
      }
    }, function (error, response) {
        if (error) {
          console.log(error);
        } else {
          return response.created;
        }
        
    });

  },

  getSample: function(id, _type, callback) {
    return client.get({
      index: 'features',
      type: _type,
      id: id
    }, function (error, response) {
      if (error) {
        console.log(error);
        return 'ERROR GETTING.';
      } else {
        console.log("Successful Get.")
        return callback(response._source);
      }
    });
  }

};

var indexName = 'features'

function indexExists() {
    return client.indices.exists({
        index: indexName
    });
}

function initIndex() {
    return client.indices.create({
        index: indexName
    });
}

function deleteIndex() {
    return client.indices.delete({
        index: indexName
    });
}


function initMappings() {
  console.log("Initializing mappings");
    resp1 = client.indices.putMapping({
        index: indexName,
        type: 'linguistic',
        body: {
            properties: {
                name: { type: 'text' },
                data: {
                    type: 'object',
                },
                transcript: {
                    type: 'text',
                }
            },
            dynamic: true,
            enabled: true
        }
    });

    resp2 = client.indices.putMapping({
        index: indexName,
        type: 'audio',
        body: {
            properties: {
                name: { type: 'text' },
                data: {
                    type: 'object',
                }
            },
            dynamic: true,
            enabled: true
        }
    });

    return (resp1 + '\n' + resp2)
}
	

function get_stats(vector) {

  features = vector.reduce(stats);

	return features;
}

