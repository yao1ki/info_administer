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
        ghost_id: id,
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
        user_id: id,
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
  async notic(id) {
    const { ctx } = this;
    let shop;

    const start =
      id == 0
        ? 1
        : id == 1
        ? 3
        : id == 2
        ? (shop = await ctx.model.Ghost.findAll({
            where: { dead: "1",[Op.or]:[{state:5},{state:6}],[Op.not]:[{state:4}] },
            include: { model: ctx.model.Rein },
          }))
        : (shop = await ctx.model.Ghost.findAll({
            where: { dead: "1",[Op.not]:[{state:4}] },
            include: { model: ctx.model.Rein },
          }));
          start==1||start==3?shop = await ctx.model.Ghost.findAll({
      where: { state: start, dead: "1",[Op.not]:[{state:4}] },
      include: { model: ctx.model.Rein },
    }):'';

    if (!shop) {
      ctx.throw(404, ctx.__("未找到"));
    }
    return shop;
  }
  async querystate(state, params) {
    const { ctx } = this;
    let shop;
    if (params) {
      shop = await ctx.model.Ghost.findAll({
        where: {
          state: state,
          dead: "1",

          [Op.or]: [
            {
              name: {
                [Op.like]: `%${params}%`,
              },
            },
            {
              reason: {
                [Op.like]: `%${params}%`,
              },
            },
            {
              id: {
                [Op.like]: `%${params}%`,
              },
            },
          ],
        },
        include: [
          {
            model: ctx.model.Order,
            where: { state: "0" },
            include: { model: ctx.model.User },
          },
        ],
      });
    } else {
      shop = await ctx.model.Ghost.findAll({
        where: { state: state, dead: "1" },
        include: [
          {
            model: ctx.model.Order,
            where: { state: "0" },
            include: { model: ctx.model.User },
          },
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
          dead: "1",

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
        include: { model: ctx.model.Rein },
      });
    } else {
      shop = await ctx.model.Ghost.findAll({
        where: { state: state, dead: "1" },
        include: { model: ctx.model.Rein },
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
          id: id,

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
