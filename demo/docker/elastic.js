// var elastic = require('elasticsearch');

//Begin module function definitions
module.exports = {

  indexTest : function() {
    return "Success.";
  },
  /* Temp function to test indexing entire document */
  indexAll: function (document, id) {
    console.log("Handling sample, id:" + id);

	  return "Success."
  },

  /* Index the raw audio features of the sample */
  indexAudio: function(audio, id) {
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
  	}

  	index(indexable, 'audio', id);

  },

  /* Index the derived linguistic features of the sample */
  indexLing: function(linguist, id) {

  },

  /* Index the metadata of the sample for displaying */
  indexMetaData: function(name, email, transcript, id) {
    //check what params will be passed in
  }
};
	

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
