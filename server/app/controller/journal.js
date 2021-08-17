"use strict";
const Controller = require("egg").Controller;

const crypto = require("crypto");

class JournalController extends Controller {
 
  async index() {
    const { ctx, service } = this;
    const opt = ctx.helper.curd(ctx);
    const ret = await service.journal.list(opt);
    ctx.body = ctx.success(ret.rows, { total: ret.count });
  }
  async create() {
    const ctx = this.ctx;

    const {
        experience
    } = ctx.request.body;
    const journal = await ctx.service.journal.create({
        experience
    });
    ctx.body = ctx.success(journal);
  }

}

module.exports = JournalController;
