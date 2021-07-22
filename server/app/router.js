"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.post("/api/login", controller.user.login);
  router.get("/api/user", controller.user.current);

  router.get("/api/querystate/:state", controller.ghost.querystate);
  router.get("/api/userlist/:potence", controller.user.userlist);
  router.get("/api/query", controller.ghost.query);
  router.get("/api/ghostlist", controller.ghost.ghostlist);
  
  router.resources("/api/users", controller.user);
  router.resources("/api/books", controller.book);
  router.resources("/api/ghosts", controller.ghost);

  router.get("/api/book", controller.book.current);
  router.get("/api/order/test", controller.orderform.test);

};
