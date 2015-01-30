
/**
 * Initialize a new `Utils` instance
 *
 * @class
 */
function Utils () {

  if (!(this instanceof Utils))
      return new Utils();

}

/**
 * Check if the pricepoint is within the past 24h
 *
 * @param  {String}  pricePoint
 * @return {Boolean}
 */
Utils.prototype.lastDayPrices = function(pricePoint) {

  /**
   * Timestamp from 24h ago
   * @type {Number}
   */
  var oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);

  return (pricePoint.split(' ')[0] > oneDayAgo);

};

/**
 * Returns a formatted pricepoint
 *
 * @param  {String} pricePoint
 * @return {Object}
 */
Utils.prototype.formatPricePoints = function(pricePoint) {

  /**
   * Parsed pricepoint
   * - [0]: Timestamp
   * - [1]: Median price for that hour
   * @type {Array}
   */
  var parsedPricePoint = pricePoint.split(' ');

  return { time: parseInt(parsedPricePoint[0], 10), price: parseInt(parsedPricePoint[1], 10) };

};

module.exports = Utils;
