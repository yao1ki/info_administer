"use strict";
const Service = require("egg").Service;
const moment = require("moment");
const Op = require("sequelize").Op;
class GhostService extends Service {
  async show(id) {
    const { ctx } = this;
    const shop = await ctx.model.Ghost.findByPk(id);
    if (!shop) {
      ctx.throw(404, ctx.__("目标未找到"));
    }
    return shop;
  }
  async aa() {
    const { ctx } = this;
    let ret = await ctx.model.Ghost.findAll({
      where: { lifetime: 0 },
    });
    ret === undefined
      ? ""
      : ret.map((v, i) =>
          moment(v.time_end).diff(moment(moment().format()), "days")<0?console.log(v.name,v.time_end):''
        );
    console.log("aaaaaaaaaaaaaaaaaa");
  }
  async list(arg) {
    const { ctx } = this;
    console.log("=======>",ctx)
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
    return await ctx.model.Ghost.findAndCountAll(opt);
  }

  async create(data) {
    const { ctx } = this;
    try {
      await ctx.model.Ghost.create(data);
      return;
    } catch (e) {
      ctx.logger.warn(e);
      ctx.throw(500, ctx.__("创建失败"));
    }
  }

  async update(data) {
    const { ctx } = this;
    try {
      return await ctx.model.Ghost.update(data);
    } catch (e) {
      ctx.logger.warn(e);
      ctx.throw(500, ctx.__("修改失败"));
    }
  }
  async ghostlist(params) {
    const { ctx } = this;
    let shop;

    if (params) {
      shop = await ctx.model.Ghost.findAll({
        where: {
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
            {
              lifetime: {
                [Op.like]: `%${params}%`,
              },
            },
            {
              sort: {
                [Op.like]: `%${params}%`,
              },
            },
          ],
        },
        include: { model: ctx.model.Rein },
      });
    } else {
      shop = await ctx.model.Ghost.findAll({

        include: { model: ctx.model.Rein },
      });
    }
    if (!shop) {
      ctx.throw(404, ctx.__("未找到"));
    }
    return shop;
  }
  async ghoststate(state, params) {
    const { ctx } = this;
    let shop;
    if (params) {
      shop = await ctx.model.Ghost.findAll({
        where: {
          rein_id: state,
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${params}%`,
              },
            },
            {
              id: {
                [Op.like]: `%${params}%`,
              },
            },
            {
              lifetime: {
                [Op.like]: `%${params}%`,
              },
            },
            {
              sort: {
                [Op.like]: `%${params}%`,
              },
            },
            {
              cause: {
                [Op.like]: `%${params}%`,
              },
            },
          ],
        },
        include: { model: ctx.model.Rein },
      });
    } else {
      shop = await ctx.model.Ghost.findAll({
        where: { rein_id: state },
        include: { model: ctx.model.Rein },
      });
    }
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
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${params}%`,
              },
            },
            {
              id: {
                [Op.like]: `%${params}%`,
              },
            },
            {
              lifetime: {
                [Op.like]: `%${params}%`,
              },
            },
            {
              sort: {
                [Op.like]: `%${params}%`,
              },
            },
          ],
        },
        include: { model: ctx.model.Rein },
      });
    } else {
      shop = await ctx.model.Ghost.findAll({
        where: { state: state },
        include: { model: ctx.model.Rein },
      });
    }
    if (!shop) {
      ctx.throw(404, ctx.__("未找到"));
    }
    return shop;
  }
  async query(name) {
    const { ctx } = this;
    const shop = await ctx.model.Ghost.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    if (!shop) {
      ctx.throw(404, ctx.__("未找到"));
    }
    return shop;
  }
  async destroy(id) {
    await this.ctx.model.Ghost.destroy({ where: { id } });
  }
}

module.exports = GhostService;
