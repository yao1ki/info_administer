'use strict';
const Controller = require('egg').Controller;

class FruitController extends Controller {


    async index() {
        const { ctx, service } = this;
        const opt = ctx.helper.curd(ctx);
        const ret = await service.fruit.list(opt);
        ctx.body = ctx.success(ret.rows, { total: ret.count });
    }

    async create() {
        const ctx = this.ctx;
        const { breed, } = ctx.request.body;
        const fruit = await ctx.service.fruit.create({
            breed
        });
        ctx.body = ctx.success(fruit);
    }

    async update() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        const fruit = await service.fruit.show(id);
        const { breed } = ctx.request.body;
        await fruit.update({ breed });
        ctx.body = ctx.success();
    }
    async destroy() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        const fruit = await service.fruit.show(id);
        await fruit.destroy();
        ctx.body = ctx.success();
    }



}

module.exports = FruitController;