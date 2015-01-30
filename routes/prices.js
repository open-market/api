
/**
 * Dependencies
 */

var utils = require('../lib/utils')();

module.exports = function* () {

  var query    = this.request.query,
      appID    = query.appID,
      itemName = query.item;

  if (!itemName)
    this.throw(400, 'Missing item parameter');

  else if (!appID)
    this.throw(400, 'Missing appID parameter');

  else if (isNaN(appID))
    this.throw(400, 'Invalid appID');

  /**
   * Items price history
   * @type {Array}
   */
  var priceHistory = yield this.redis.lrange(`market:prices:${appID}:${encodeURIComponent(itemName)}`, 0, 24);

  // Format `priceHistory` and only return data from the past 24 hours
  priceHistory = priceHistory
                  .filter(utils.lastDayPrices)
                  .map(utils.formatPricePoints);

  this.body = { history: priceHistory } ;

};
