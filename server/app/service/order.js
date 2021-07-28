'use strict';

const Service = require('egg').Service;

class OrderService extends Service {

    async show(id) {
        const { ctx } = this;
        const shop = await ctx.model.Order.findByPk(id);
        if (!shop) {
            ctx.throw(404, ctx.__('账号未找到'));
        }
        return shop;
    }
    async create(data) {
        const { ctx } = this;
        try {
            await ctx.model.Order.create(data);
            return;
        } catch (e) {
            ctx.logger.warn(e);
            ctx.throw(500, ctx.__('创建账号失败'));
        }
    }
    

    async update(data) {
        const { ctx } = this;
        try {
            return await ctx.model.Order.update(data);
        } catch (e) {
            ctx.logger.warn(e);
            ctx.throw(500, ctx.__('修改账号失败'));
        }
    }

    async ghostlist(params) {
        const { ctx } = this;
        let shop;
    
        if (params) {
          shop = await ctx.model.Ghost.findAll({
            where: {
              state:{[Op.not]:"4"}
            },
            
          });
        } else {
          shop = await ctx.model.Ghost.findAll({
            where: {
              state:{[Op.not]:"4"},}}
          );
        }
        if (!shop) {
          ctx.throw(404, ctx.__("未找到"));
        }
        return shop;
      }


}

module.exports = OrderService;
