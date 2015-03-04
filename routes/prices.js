
/**
 * Dependencies
 */

const mongoose = require('mongoose');

module.exports = function* () {

  'use strict';

  var query    = this.request.query,
      appID    = query.appID,
      itemName = query.item;

  if (!itemName)
    this.throw(400, 'Missing item parameter');

  else if (!appID)
    this.throw(400, 'Missing appID parameter');

  else if (isNaN(appID))
    this.throw(400, 'Invalid appID');

  const oneDayAgo = Date.now() - 86400000;

  let recentPrices = yield mongoose.models.item_stats
                                            .find({ name:  itemName,
                                                    appID: appID,
                                                    timestamp: { $gte: new Date(oneDayAgo) } },
                                                  { _id: 0,
                                                    timestamp: 1,
                                                    medianPrice: 1,
                                                    totalSold: 1 })
                                            .sort({ timestamp: -1 })
                                            .limit(24)
                                            .exec();

  recentPrices = recentPrices.map(function (pricePoint) {

    return {

      time:  new Date(pricePoint.timestamp).getTime(),
      price: pricePoint.medianPrice,
      sold:  pricePoint.totalSold

    };

  });

  this.body = { history: recentPrices };

};
