"use strict";
const Controller = require("egg").Controller;

const crypto = require("crypto");

class RecordController extends Controller {
  async index() {
    const { ctx } = this;
    const records = await ctx.model.Record.findAll({
      include: { model: ctx.model.Ghost, },

      
        include:{ model: ctx.model.User }
      //attributes:['id','ghost_id','user_id']{关联部分数据}
    });
    ctx.body = ctx.success(records);
  }



}

module.exports = RecordController;
