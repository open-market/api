
/**
 * Dependencies
 */

var redis = require('then-redis');

/**
 * Constants
 */

const redisClientOpts = {

  host:     process.env.REDIS_HOST,
  port:     process.env.REDIS_PORT,
  password: process.env.REDIS_PASS

};

var redis = redis.createClient(redisClientOpts);

exports.redis = function* (next) {

  this.redis = redis;
  yield next;

};

exports.errorHandler = function* (next) {

  try {

    yield next;

  } catch (err) {

    this.status = err.status || 500;
    this.body = { error: 'API error' };

    this.app.emit('error', err, this);

  }

};

exports.pageNotFound = function* (next) {

  yield next;

  if (this.status !== 404)
    return;

  this.body = 'Page not found';

};
