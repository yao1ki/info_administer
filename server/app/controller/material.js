"use strict";
const Controller = require("egg").Controller;

const Op = require("sequelize").Op;

class MaterialController extends Controller {
    async index() {
        const { ctx, service } = this;
        const opt = ctx.helper.curd(ctx);
        const ret = await service.material.list(opt);
        ctx.body = ctx.success(ret.rows, { total: ret.count });

    }
    async update() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        const tool = await service.material.show(id);
        const {quantity} = ctx.request.body;
        await tool.update({quantity});
        ctx.body = ctx.success();
    }
}

module.exports = MaterialController;
