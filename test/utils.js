
/* globals describe, it */

/**
 * Dependencies
 */

var utils  = require('../lib/utils')(),
    should = require('should');

describe('Utils module', function () {

  it('.lastDayPrices() should return whether or not the given price point is within the past 24h.', function (done) {

    /**
     * Timestamp from 2 days ago
     * @type {Number}
     */
    var twoDaysAgo = Date.now() - (48 * 60 * 60 * 1000);

    utils.lastDayPrices(`${Date.now()} 240`).should.be.true;

    utils.lastDayPrices(`${twoDaysAgo} 240`).should.be.false;

    return done();

  });

  it('.formatPricePoints() should return a formatted price point as an object.', function (done) {

    /**
     * Raw price points
     * @type {Array}
     */
    var pricePoints = [

      '1422579575469 226',
      '1422575974510 225',
      '1422572373369 224',
      '1422568772333 224'

    ];

    /**
     * Formatted price points
     * @type {Array}
     */
    var formattedPricePoints = pricePoints.map(utils.formatPricePoints);

    formattedPricePoints.forEach(function (pricePoint) {

      pricePoint.should.have.properties(['time', 'price']);

      pricePoint.price.should.be.a.Number;
      pricePoint.time.should.be.a.Number;

    });

    return done();

  });

});
