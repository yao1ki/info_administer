'use strict';
const Controller = require('egg').Controller;

class BookController extends Controller {


    async index() {
        const { ctx, service } = this;
        const opt = ctx.helper.curd(ctx);
        const ret = await service.book.list(opt);
        ctx.body = ctx.success(ret.rows, { total: ret.count });
    }

    async create() {
        const ctx = this.ctx;
        const { name, author, } = ctx.request.body;
        const book = await ctx.service.book.create({
            name, author
        });
        ctx.body = ctx.success(book);
    }

    async update() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        const book = await service.book.show(id);
        const { name, author } = ctx.request.body;
        await book.update({ name, author });
        ctx.body = ctx.success();
    }
    async destroy() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        const book = await service.book.show(id);
        await book.destroy();
        ctx.body = ctx.success();
    }



}

module.exports = BookController;