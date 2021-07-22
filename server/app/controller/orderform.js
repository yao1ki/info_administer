"use strict";
const Controller = require("egg").Controller;

const Op = require("sequelize").Op;

class OrderformController extends Controller {
  

  async test() {
    const { ctx } = this;
    const orders = await ctx.model.Order.findAll({
      include: [{ model: ctx.model.User }, { model: ctx.model.Ghost }],
    });
    ctx.body = ctx.success(orders);
  }
}

module.exports = OrderformController;
