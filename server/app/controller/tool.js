'use strict';
const Controller = require('egg').Controller;

class ToolController extends Controller {


    async index() {
        const { ctx, service } = this;
        const opt = ctx.helper.curd(ctx);
        const ret = await service.tool.list(opt);
        ctx.body = ctx.success(ret.rows, { total: ret.count });
    }

    async create() {
        const ctx = this.ctx;
        const { name, titles,covers,desc,user,year } = ctx.request.body;
        const tool = await ctx.service.tool.create({
            name, titles,covers,desc,user,year
        });
        ctx.body = ctx.success(tool);
    }

    async update() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        const tool = await service.tool.show(id);
        const {name, titles,covers,desc,user,year} = ctx.request.body;
        await tool.update({name, titles,covers,desc,user,year });
        ctx.body = ctx.success();
    }
    async show() {
        const { ctx,service } = this;
        const id = ctx.params.id;
        const tool = await service.tool.show(id);
        ctx.body = ctx.success(tool);
    }

    async destroy() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        const tool = await service.tool.show(id);
        await tool.destroy();
        ctx.body = ctx.success();
    }



}

module.exports = ToolController;