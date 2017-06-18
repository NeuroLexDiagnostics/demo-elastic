var elasticsearch = require('elasticsearch');
require('dotenv').config({ silent: true })
var client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH
});


//Begin module function definitions
module.exports = {

  init : function() {

    indexExists().then(function (exists) {
        if (exists) {
            console.log('Deleting index');
            return deleteIndex();
        }
    }).then(initIndex).then(initLingMapping).then(function() {
        client.ping({
          requestTimeout: 30000,
        }, function (error) {
          if (error) {
            console.error(error)
            console.error('elasticsearch cluster is down!');
            return false;
          } else {
            console.log('All is well');
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
  indexAudio: function(audio, id, name, transcript) {
  	audio_features = ['ZCR', 'spetral_entropy', 'MFCC', 'spectral_rollof', 'energy', 'spectral_energy', 'entropy', 
                      'spectral_spread', 'spectral_centroid', 'chroma_vector'];

  	indexable = {};
  	//Create new indexable document that starts with just the id and then we will add derived features to be indexed.

  	for (var f in audio_features) {
  		if (f == 'ZCR' || f == 'MFCC') {
  			// ZCR_stds = [];
  			for (vector in audio.f) {
    				get_std(vector);
  			}

  		}
      field_std = f + '_std';
      filed_mean = f + '_mean';
  		indexable.field_std = get_std(reqAudio.f);
      indexable.filed_mean = get_mean(reqAudio.f);
      console.log('Mean, STD :' + indexable.filed_mean + ', ' + indexable.field_std);
  	}

  	client.index({
      index: 'features',
      type: 'audio',
      id: id,
      body: {
        name : name,
        data : indexable,
        transcript :transcript
      }
    }, function (error, response) {
      if (error) {
        console.log(error)
        console.log("ERROR above")
      } else {
        return response
      }
    });

  },

  /* Index the derived linguistic features of the sample */
  indexLing: function(ling_data, id, transcript, name) {

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
          console.log(error)
        } else {
          return response.created
        }
        
    });

  },

  /* Index the metadata of the sample for displaying */
  indexMetaData: function(name, email, transcript, id) {
    //check what params will be passed in
  },

  getSample: function(id, callback) {
    client.get({
      index: 'features',
      type: 'linguistic',
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


function initLingMapping() {
    return client.indices.putMapping({
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
}
	

// function get_std(vector) {
// 	//Install node.js statistics library

// 	console.log(vector.length());
// 	return 4.005;
// }

// // function get_mean(vector) {
// //   console.log(vector.length());

// //   return stats.mean(vector);
// // }

// function index(document, index, id) {
//   return;
// 	//connect to client

// 	//create index if it doesn't exist

// 	// client.post(document)


// 	//assert indexed = true on response
// }
