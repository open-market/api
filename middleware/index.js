
exports.errorHandler = function* (next) {

  try {

    yield next;

  } catch (err) {

    this.status = err.status || 500;

    this.body = { error: (err.status === 400) ? err.message : 'API error'  };

    if (err.status !== 400)
      this.app.emit('error', err, this);

  }

};

exports.pageNotFound = function* (next) {

  yield next;

  if (this.status !== 404)
    return;

  this.body = 'Page not found';

};
