'use strict';
const Controller = require('egg').Controller;

const Op = require('sequelize').Op;

class GhostController extends Controller {


    async index() {
        const { ctx, service } = this;
        const opt = ctx.helper.curd(ctx);

        const ret = await service.ghost.list(opt);
        ctx.body = ctx.success(ret.rows, { total: ret.count });
    }
    async ghostlist() {
        const { ctx, service } = this;
        const {params} = ctx.request.query;
        const ghost = await service.ghost.ghostlist(params);
        ctx.body = ctx.success(ghost);
    }
    async create() {
        const ctx = this.ctx;

        const { name,lifetime,cause,sort,state,ghost_id} = ctx.request.body;
        const ghost = await ctx.service.ghost.create({
            name,lifetime,cause,sort,state,ghost_id
        });
        ctx.body = ctx.success(ghost);
    }

    async update() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        const ghost = await service.ghost.show(id);
        const { name,lifetime,cause,sort,state,ghost_id} = ctx.request.body;
        await ghost.update({ name,lifetime,cause,sort,state,ghost_id });
        ctx.body = ctx.success();
    }
    async show() {
        const { ctx,service } = this;
        const id = ctx.params.id;

        const ghost = await service.ghost.show(id);
        ctx.body = ctx.success(ghost);
    }
    async querystate() {
        const { ctx, service } = this;
        const state = ctx.params.state;
        const {params} = ctx.request.query;
        const ghost = await service.ghost.querystate(state,params);
        ctx.body = ctx.success(ghost);
    }
    async query() {
        const { ctx, service } = this;
        const {name} = ctx.request.query;
        const ghost = await service.ghost.query(name);
        ctx.body = ctx.success(ghost);
    }
    async destroy() {
        const { ctx, service } = this;

        const id = ctx.params.id;
        const ghost = await service.ghost.show(id);
        await ghost.update({state: 4});
        ctx.body = ctx.success();
    }
    async move() {
        const { ctx, service } = this;

        const id = ctx.params.id;
        const ghost = await service.ghost.show(id);
        await ghost.update({state: 4});
        ctx.body = ctx.success();
    }




}

module.exports = GhostController;