"use strict";
const Controller = require("egg").Controller;

const crypto = require("crypto");

class MoneyController extends Controller {
  async index() {
    console.log("================>")
    const { ctx, service } = this;
    const opt = ctx.helper.curd(ctx);
    const ret = await service.money.list(opt);
    ctx.body = ctx.success(ret.rows);
  }

  async create() {
    const ctx = this.ctx;
    const { remittor, number, comment, address, payee } = ctx.request.body;
    const money = await ctx.service.money.create({
      remittor,
      number,
      comment,
      address,
      payee,
    });
    ctx.body = ctx.success(money);
  }

  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const money = await service.money.show(id);
    const { remittor, number, comment, address, payee } = ctx.request.body;

    await money.update({
      remittor,
      number,
      comment,
      address,
      payee,
    });

    ctx.body = ctx.success();
  }

  async show() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const money = await service.money.show(id);
    ctx.body = ctx.success(money);
  }
}

module.exports = MoneyController;
