
/**
 * Dependencies
 */

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Item stats schema
 * @type {Schema}
 */
var itemStatsSchema = new Schema({

  name:        String,
  appID:       Number,
  medianPrice: Number,
  totalSold:   Number,
  timestamp:   Date

});

module.exports = mongoose.model('item_stats', itemStatsSchema);
