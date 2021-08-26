"use strict";
const Op = require("sequelize").Op;

const Service = require("egg").Service;

class OrderService extends Service {
  
  async show(id) {
    const { ctx } = this;
    const shop = await ctx.model.Order.findByPk(id);
    if (!shop) {
      ctx.throw(404, ctx.__("账号??未找到"));
    }
    return shop;
  }
  async showup(id) {
    const { ctx } = this;
    let shop = await ctx.model.Order.findAll({
      where: {
        ghost_id:id,
      },
    });
    if (!shop) {
      ctx.throw(404, ctx.__("未找到"));
    }
    return shop;
  }
  async showupdate(id) {
    const { ctx } = this;
    let shop = await ctx.model.Order.findAll({
      where: {
        user_id:id,
      },
    });
    if (!shop) {
      ctx.throw(404, ctx.__("未找到"));
    }
    return shop;
  }
  async create(data) {
    const { ctx } = this;
    try {
      await ctx.model.Order.create(data);
      return;
    } catch (e) {
      ctx.logger.warn(e);
      ctx.throw(500, ctx.__("创建失败"));
    }
  }

  async update(data) {
    const { ctx } = this;
    try {
      return await ctx.model.Order.update(data);
    } catch (e) {
      ctx.logger.warn(e);
      ctx.throw(500, ctx.__("修改失败"));
    }
  }


  // ////
  async querystate(state, params) {
    const { ctx } = this;
    let shop;
    if (params) {
      shop = await ctx.model.Ghost.findAll({
        where: {
          state: state,
          dead : "1",

          [Op.or]: [
            {
              name: {
                [Op.like]: `%${params}%`,
              },
            },
            {
              ghost_id: {
                [Op.like]: `%${params}%`,
              },
            },
          ],
        },
        include: [
          { model: ctx.model.Order,where:{state:"0"}, include: { model: ctx.model.User } },
        ],
      });
    } else {
      shop = await ctx.model.Ghost.findAll({
        where: { state: state, dead : "1" },
        include: [
          { model: ctx.model.Order,where:{state:"0"}, include: { model: ctx.model.User } },
        ],
      });
    }
    if (!shop) {
      ctx.throw(404, ctx.__("未找到"));
    }
    return shop;
  }
  async querystate1(state, params) {
    const { ctx } = this;
    let shop;
    if (params) {
      shop = await ctx.model.Ghost.findAll({
        where: {
          state: state,
          dead : "1",

          [Op.or]: [
            {
              name: {
                [Op.like]: `%${params}%`,
              },
            },
            {
              ghost_id: {
                [Op.like]: `%${params}%`,
              },
            },
          ],
        },
      include: { model: ctx.model.Rein, },
  
      });
    } else {
      shop = await ctx.model.Ghost.findAll({
        where: { state: state, dead : "1" },
        include: { model: ctx.model.Rein, },
      });
    }
    if (!shop) {
      ctx.throw(404, ctx.__("未找到"));
    }
    return shop;
  }
  
  async recordstate(id, params) {
    const { ctx } = this;
    let shop;
    if (params) {
      shop = await ctx.model.Ghost.findAll({
        where: {
          id:id,

          [Op.or]: [
            {
              name: {
                [Op.like]: `%${params}%`,
              },
            },
            {
              ghost_id: {
                [Op.like]: `%${params}%`,
              },
            },
          ],
        },
        include: [
          { model: ctx.model.Order, include: { model: ctx.model.User } },
        ],
      });
    } else {
      shop = await ctx.model.Ghost.findAll({
        where: { id: id },

        include: [
          { model: ctx.model.Order, include: { model: ctx.model.User } },
        ],
      });
    }
    if (!shop) {
      ctx.throw(404, ctx.__("未找到"));
    }
    return shop;
  }
}

module.exports = OrderService;
