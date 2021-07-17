'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/login', controller.user.login);
  router.get('/api/user', controller.user.current);
  router.get('/api/book', controller.book.current);
  // router.get('/api/user', controller.user.show);
  //router.get('/api/people/:id',controller.user.show)
  router.resources('/api/users',controller.user);
 // router.get('/api/users/index', controller.user.index);
  router.resources('/api/books',controller.book);
  router.resources('/api/ghosts',controller.ghost);
  //router.resources('/api/fruits',controller.fruit);
  //router.get('/api/fruits/index',controller.fruit.index);
 // router.delete('/api/users/:id',controller.user.destroy);
};
