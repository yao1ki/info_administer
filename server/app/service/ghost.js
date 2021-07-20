'use strict';

const Service = require('egg').Service;

class GhostService extends Service {

    async show(id) {
        const { ctx } = this;
        const shop = await ctx.model.Ghost.findByPk(id);
        if (!shop) {
            ctx.throw(404, ctx.__('目标未找到'));
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
        return await ctx.model.Ghost.findAndCountAll(opt);
    }

    async create(data) {
        console.log("++++++创建")

        const { ctx } = this;
        try {
            await ctx.model.Ghost.create(data);
            return;
        } catch (e) {
            ctx.logger.warn(e);
            ctx.throw(500, ctx.__('创建失败'));
        }
    }

    async update(data) {
        const { ctx } = this;
        console.log("++++++修改")
        try {
            console.log(ctx);
            return await ctx.model.Ghost.update(data);
        } catch (e) {
            ctx.logger.warn(e);
            ctx.throw(500, ctx.__('修改失败'));
        }
    }
    async querystate(state){
        const { ctx } = this;
        console.log('--寻找---',state)
        const shop = await ctx.model.Ghost.findAll({
            where: {state: state},
        });
        if (!shop) {
            ctx.throw(404, ctx.__('书籍未找到'));
        }
        return shop;

    }
    async destroy(id) {
        await this.ctx.model.Ghost.destroy({ where: { id } });
    }




}

module.exports = GhostService;
