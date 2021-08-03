'use strict';

const Service = require('egg').Service;

class ToolService extends Service {

    async show(id) {
        const { ctx } = this;
        const shop = await ctx.model.Tool.findByPk(id);
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
        return await ctx.model.Tool.findAndCountAll(opt);
    }

    async create(data) {
        const { ctx } = this;
        try {
            await ctx.model.Tool.create(data);
            return;
        } catch (e) {
            ctx.logger.warn(e);
            ctx.throw(500, ctx.__('创建账号失败'));
        }
    }

    async update(data) {
        const { ctx } = this;
        try {
            return await ctx.model.Tool.update(data);
        } catch (e) {
            ctx.logger.warn(e);
            ctx.throw(500, ctx.__('修改账号失败'));
        }
    }

    async destroy(id) {
        await this.ctx.model.Tool.destroy({ where: { id } });
    }



}

module.exports = ToolService;
