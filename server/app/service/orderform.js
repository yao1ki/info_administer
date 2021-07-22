"use strict";

const Service = require("egg").Service;
const Op = require("sequelize").Op;
class OrderformService extends Service {

  async list(arg) {
    const { ctx } = this;
    const opt = {};
    if (arg.offset) {
      opt.offset = arg.offset;
    }
    if (arg.limit) {
      opt.limit = arg.limit;
    }
    if (arg.where) {
      opt.where = arg.where;
    }
    if (arg.include) {
      opt.include = arg.include;
    }
    opt.order = [["id", "ASC"]];
    return await ctx.model.Order.findAndCountAll(opt);
  }



  async update(data) {
    const { ctx } = this;
    console.log("++++++修改");
    try {
      console.log(ctx);
      return await ctx.model.Order.update(data);
    } catch (e) {
      ctx.logger.warn(e);
      ctx.throw(500, ctx.__("修改失败"));
    }
  }



 
}

module.exports = OrderformService;
