'use strict';
const Controller = require('egg').Controller;

const Op = require('sequelize').Op;

class OrderformController extends Controller {


    async index() {
        const { ctx, service } = this;
        const opt = ctx.helper.curd(ctx);
        console.log("index")

        const ret = await service.order.list(opt);
        ctx.body = ctx.success(ret.rows, { total: ret.count });
    }

    async update() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        console.log("update")
        const ghost = await service.order.show(id);
        const { name,lifetime,cause,sort,state} = ctx.request.body;
        await ghost.update({ name,lifetime,cause,sort,state });
        ctx.body = ctx.success();
    }





}

module.exports = OrderformController;