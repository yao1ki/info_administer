"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.post("/api/login", controller.user.login);
  router.get("/api/user", controller.user.current);
  router.get("/api/notic", controller.order.notic);

  router.get("/api/querystate/:state", controller.ghost.querystate);
  router.get("/api/userlist/:potence", controller.user.userlist);
  router.get("/api/query", controller.ghost.query);
  router.get("/api/ghostlist", controller.ghost.ghostlist);
  router.put("/api/ghosts/move/:id", controller.ghost.move);
  router.get("/api/list/:state", controller.order.list);
  router.get("/api/order/record/:id", controller.order.record);
  router.get("/api/order/list/:state", controller.order.list1);
  router.put("/api/aa", controller.ghost.aa);

  
  
  router.get("/api/ghost/list/:state", controller.ghost.list);

  router.resources("/api/moneys", controller.money);
  router.resources("/api/records", controller.record);
  router.resources("/api/journals",controller.journal);
  router.resources("/api/rein", controller.reincarnate);
  router.resources("/api/material", controller.material);
  router.resources("/api/tools", controller.tool);
  router.resources("/api/users", controller.user);
  router.resources("/api/ghosts", controller.ghost);
  router.resources("/api/orders", controller.order);
  router.resources("/api/books", controller.book);
  router.get("/api/book", controller.book.current);
 // router.get("/api/order/test", controller.order.test);
 
};
