"use strict";
const Controller = require("egg").Controller;
const Op = require("sequelize").Op;

const crypto = require("crypto");

class ReincarnateController extends Controller {
  async index() {
    const { ctx } = this;
    const records = await ctx.model.Ghost.findAll({
      where: {
        [Op.not]: {
          user_id: "",
        },
      },
      include: { model: ctx.model.User },

      //attributes:['id','ghost_id','user_id']{关联部分数据}
    });
    ctx.body = ctx.success(records);
  }
}

module.exports = ReincarnateController;
