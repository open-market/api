
/**
 * Dependencies
 */

var Items = require('mongoose').models.items;

module.exports = function* () {

  var query       = this.request.query,
      searchLimit = query.limit || 10,
      appID       = query.appID,
      itemName    = query.name;

  if (!itemName)
    this.throw(400, 'Missing name parameter');

  else if (appID && isNaN(appID))
    this.throw(400, 'Invalid appID');

  else if (query.limit && isNaN(query.limit))
    this.throw(400, 'Invalid limit parameter');

  /**
   * MongoDB search query
   * @type {Object}
   */
  var findQuery = {

    $text: { $search: itemName }

  };

  if (appID)
    findQuery.appID = appID;

  /**
   * Search results from MongoDB
   * @type {Array}
   */
  var searchResults = yield Items
                            .find(findQuery, { score: { $meta: 'textScore' }, _id: 0 })
                            .limit(searchLimit)
                            .sort({ score: { $meta: 'textScore' }, timesSeen: -1 })
                            .exec();

  searchResults = searchResults.map(function (searchResult) {

    var newResult = JSON.parse(JSON.stringify(searchResult));

    newResult.firstSeen = new Date(searchResult.firstSeen).getTime();

    return newResult;

  });

  this.body = { results: searchResults };

};
