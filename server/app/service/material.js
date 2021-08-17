'use strict';

const Service = require('egg').Service;

class MaterialService extends Service {
    async show(id) {
        const { ctx } = this;
        const shop = await ctx.model.Material.findByPk(id);
        if (!shop) {
            ctx.throw(404, ctx.__('账号未找到'));
        }
        return shop;
    }
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
        opt.order = [['id', 'ASC']];
        return await ctx.model.Material.findAndCountAll(opt);
    }








}

module.exports = MaterialService;
