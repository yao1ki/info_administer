'use strict';

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      ctx.app.emit('error', err, ctx);
      const status = err.code || err.status || 500;
      const error = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message;

      ctx.body = {
        code: status,
        error,
      };

      if (status > 400 && status <= 404) {
        ctx.status = status;
      }

    }
  };
};