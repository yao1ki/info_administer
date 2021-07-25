"use strict";
const Controller = require("egg").Controller;

const crypto = require("crypto");

class OrderController extends Controller {
  async index() {
    const { ctx } = this;
    const orders = await ctx.model.Order.findAll({
      include: [{ model: ctx.model.User }, { model: ctx.model.Ghost }],
      //attributes:['id','ghost_id','user_id']{关联部分数据}
    });
    ctx.body = ctx.success(orders);
  }

  async create() {
    const ctx = this.ctx;
    const { ghost_id, user_id } = ctx.request.body;
    const order = await ctx.service.order.create({
      ghost_id,
      user_id,
    });
    ctx.body = ctx.success(order);
  }

  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const order = await service.order.show(id);
    const { ghost_id, user_id } = ctx.request.body;

    await order.update({
      ghost_id,
      user_id,
    });
    ctx.body = ctx.success();
  }

  async show() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const order = await service.order.show(id);
    ctx.body = ctx.success(order);
  }
}

module.exports = OrderController;
