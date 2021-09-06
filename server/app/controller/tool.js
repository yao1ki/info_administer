'use strict';
const Controller = require('egg').Controller;

class ToolController extends Controller {


    // async index() {
    //     const { ctx, service } = this;
    //     const opt = ctx.helper.curd(ctx);
    //     const ret = await service.tool.list(opt);
    //     ctx.body = ctx.success(ret.rows, { total: ret.count });
    // }
    async index() {
        const { ctx } = this;
        const records = await ctx.model.Tool.findAll({
          include: { model: ctx.model.User}
     
            
           
          //attributes:['id','ghost_id','user_id']{关联部分数据}
        });
        ctx.body = ctx.success(records);
      }

    async create() {
        const ctx = this.ctx;
        const { name, titles,covers,desc,user_id,year,servicelife } = ctx.request.body;
        const tool = await ctx.service.tool.create({
            name, titles,covers,desc,user_id,year,servicelife
        });
        ctx.body = ctx.success(tool);
    }

    async update() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        let user= this.ctx.locals.user.user;
        const tool = await service.tool.show(id);
        const {name,servicelife, titles,covers,desc,user_id,year,created_at} = ctx.request.body;
        await tool.update({name,servicelife, titles,covers,desc,user_id:user,year,created_at });
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