"use strict";
const Controller = require("egg").Controller;

const crypto = require("crypto");

class OrderController extends Controller {
  async index() {
    const { ctx } = this;
    const orders = await ctx.model.Ghost.findAll({
      where :{ state:"2"},
      include: [{ model: ctx.model.Order,include:{ model: ctx.model.User } }],
      //attributes:['id','ghost_id','user_id']{关联部分数据}
    });
    ctx.body = ctx.success(orders);
  }
  async list() {
    const { ctx } = this;
    const orders = await ctx.model.Ghost.findAll({
      where :{ state:"3"},
      include: [{ model: ctx.model.Order,include:{ model: ctx.model.User } }],
      //attributes:['id','ghost_id','user_id']{关联部分数据}
    });
    ctx.body = ctx.success(orders);
  }
  async list1() {
    const { ctx } = this;
    const orders = await ctx.model.Ghost.findAll({
      where :{ state:"4"},
      include: [{ model: ctx.model.Order,include:{ model: ctx.model.User } }],
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
  async ghostlist() {
    const { ctx, service } = this;
    const {params} = ctx.request.query;
    const ghost = await service.ghost.ghostlist(params);
    ctx.body = ctx.success(ghost);
}
async move() {
  const { ctx, service } = this;
  const id = ctx.params.id;
  const ghost = await service.ghost.show(id);
  await ghost.update({state: 2});
  ctx.body = ctx.success();
}
async moveghost() {
  const { ctx, service } = this;
  const id = ctx.params.id;
  const ghost = await service.ghost.show(id);
  await ghost.update({state: 3});
  ctx.body = ctx.success();
}
}

module.exports = OrderController;
