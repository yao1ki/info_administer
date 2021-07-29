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
  router.put("/api/ghosts/move/:id", controller.ghost.move);
  router.put("/api/orders/moveghost/:id", controller.order.moveghost);
  router.get("/api/list/:state", controller.order.list);
  router.get("/api/list1", controller.order.list1);
  
  router.resources("/api/users", controller.user);
 
  router.resources("/api/ghosts", controller.ghost);
  router.resources("/api/orders", controller.order);
  router.put("/api/orders/move/:id", controller.order.move);
  router.resources("/api/books", controller.book);
  router.get("/api/book", controller.book.current);
 // router.get("/api/order/test", controller.order.test);
 
};
