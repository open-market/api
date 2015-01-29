
module.exports = function* () {

  /**
   * Timestamp from 24h ago
   * @type {Number}
   */
  var ONE_DAY_AGO = Date.now() - (24 * 60 * 60 * 1000);

  var query    = this.request.query,
      appID    = query.appID,
      itemName = query.item;

  if (!itemName) {

    this.status(400);
    this.body = { error: 'Missing item parameter' };
    return;

  }

  else if (!appID) {

    this.status(400);
    this.body = { error: 'Missing appID parameter' };
    return;

  }

  else if (isNaN(appID)) {

    this.status(400);
    this.body = { error: 'Invalid appID' };
    return;

  }

  /**
   * Items price history
   * @type {Array}
   */
  var priceHistory = yield this.redis.lrange(`market:prices:${appID}:${encodeURIComponent(itemName)}`, 0, 24);

  // Format `priceHistory` and only return data from the past 24 hours
  priceHistory = priceHistory.filter(function (pricePoint) {

    return (pricePoint.split(' ')[0] > ONE_DAY_AGO);

  }).map(function (pricePoint) {

    var parsedPricePoint = pricePoint.split(' ');

    return { time: parseInt(parsedPricePoint[0], 10), price: parseInt(parsedPricePoint[1], 10) };

  });

  this.body = { history: priceHistory } ;

};
