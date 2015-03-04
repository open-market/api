
/**
 * Dependencies
 */

var middleware = require('./middleware'),
    route      = require('koa-route'),
    jade       = require('koa-jade'),
    models     = require('./models'),
    routes     = require('./routes'),
    mongoose   = require('mongoose'),
    koa        = require('koa'),
    app        = koa();

const jadeOpts = {

  viewPath: __dirname + '/views',
  noCache:  process.env.NODE_ENV !== 'production'

};

mongoose.connect(process.env.MONGO_URI);

// Middleware
app.use(jade.middleware(jadeOpts));
app.use(middleware.errorHandler);
app.use(middleware.pageNotFound);

// Routes
app.use(route.get('/', routes.index));
app.use(route.get('/api/prices', routes.prices));
app.use(route.get('/api/search', routes.search));

module.exports = app;
