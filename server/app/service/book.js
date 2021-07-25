'use strict';

const Service = require('egg').Service;

class BookService extends Service {

    async show(id) {
        const { ctx } = this;
        const shop = await ctx.model.Book.findByPk(id);
        if (!shop) {
            ctx.throw(404, ctx.__('书籍未找到'));
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
        return await ctx.model.Book.findAndCountAll(opt);
    }

    async create(data) {
        const { ctx } = this;
        try {
            await ctx.model.Book.create(data);
            return;
        } catch (e) {
            ctx.logger.warn(e);
            ctx.throw(500, ctx.__('创建书籍失败'));
        }
    }

    async update(data) {
        const { ctx } = this;
        try {
            return await ctx.model.Book.update(data);
        } catch (e) {
            ctx.logger.warn(e);
            ctx.throw(500, ctx.__('修改书籍失败'));
        }
    }
    async queryip(ip){
        const { ctx } = this;
        const shop = await ctx.model.Book.findAll({
            where: {ip: ip},
        });
        if (!shop) {
            ctx.throw(404, ctx.__('书籍未找到'));
        }
        return shop;

    }
    async destroy(id) {
        await this.ctx.model.Book.destroy({ where: { id } });
    }




}

module.exports = BookService;
