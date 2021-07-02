'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/login', controller.user.login);
  router.get('/api/user', controller.user.current);
  router.resources('/api/users',controller.user);
  router.get('/api/users/index', controller.user.index);
};
