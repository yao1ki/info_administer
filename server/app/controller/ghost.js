'use strict';
const Controller = require('egg').Controller;

class GhostController extends Controller {


    async index() {
        const { ctx, service } = this;
        const opt = ctx.helper.curd(ctx);
        console.log("index")

        const ret = await service.ghost.list(opt);
        ctx.body = ctx.success(ret.rows, { total: ret.count });
    }
v
    async create() {
        const ctx = this.ctx;
        console.log("create")

        const { name,lifetime,cause,sort,state} = ctx.request.body;
        const ghost = await ctx.service.ghost.create({
            name,lifetime,cause,sort,state
        });
        ctx.body = ctx.success(ghost);
    }

    async update() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        console.log("update")
        const ghost = await service.ghost.show(id);
        const { name,lifetime,cause,sort} = ctx.request.body;
        await ghost.update({ name,lifetime,cause,sort });
        ctx.body = ctx.success();
    }
    async show() {
        const { ctx,service } = this;
        const id = ctx.params.id;
        console.log("show")

        const ghost = await service.ghost.show(id);
        ctx.body = ctx.success(ghost);
    }
    async destroy() {
        const { ctx, service } = this;
        console.log("destroy")

        const id = ctx.params.id;
        const ghost = await service.ghost.show(id);
        await ghost.destroy();
        ctx.body = ctx.success();
    }




}

module.exports = GhostController;