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
        const { name, author,category,intro } = ctx.request.body;
        const book = await ctx.service.book.create({
            name, author,category,intro
        });
        ctx.body = ctx.success(book);
    }

    async update() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        const book = await service.book.show(id);
        const { name, author ,category,intro} = ctx.request.body;
        await book.update({ name, author,category,intro });
        ctx.body = ctx.success();
    }
    async show() {
        const { ctx,service } = this;
        const id = ctx.params.id;
        const book = await service.book.show(id);
        ctx.body = ctx.success(book);
    }
    async destroy() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        const book = await service.book.show(id);
        await book.destroy();
        ctx.body = ctx.success();
    }
    async current() {
        const { ctx, app } = this;
        const { token } = ctx.request.query;
        let decoded = await app.jwt.verify(token, app.config.keys);
        console.log('---->',decoded);
        const book = await ctx.model.User.findByPk(decoded.book,);
        if (book) {
            ctx.body = ctx.success({
                id: book.id,
                name: book.name,
            });
        } else {
            ctx.status = 401;
            ctx.throw(404, '该书籍不存在或已删除');
        }
    }



}

module.exports = BookController;