
/**
 * Dependencies
 */

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Item schema
 * @type {Schema}
 */
var itemsSchema = new Schema({

  name:      String,
  appID:     Number,
  firstSeen: Date,
  contextID: String,
  timesSeen: Number,
  image:     String

});

module.exports = mongoose.model('items', itemsSchema);
