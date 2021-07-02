'use strict';

const Service = require('egg').Service;

class UserService extends Service {

    async show(id) {
        const { ctx } = this;
        const shop = await ctx.model.User.findByPk(id);
        if (!shop) {
            ctx.throw(404, ctx.__('账号未找到'));
        }
        return shop;
    }
    async list(arg) {
        const { ctx } = this;
        const opt = {};
        if (arg.offset) {
            opt.offset = arg.offset;
        }
        if (arg.limit) {
            opt.limit = arg.limit;
        }
        if (arg.where) {
            opt.where = arg.where;
        }
        if (arg.include) {
            opt.include = arg.include;
        }
        opt.order = [['id', 'ASC']];
        return await ctx.model.User.findAndCountAll(opt);
    }

    async create(data) {
        const { ctx } = this;
        try {
            await ctx.model.User.create(data);
            return;
        } catch (e) {
            ctx.logger.warn(e);
            ctx.throw(500, ctx.__('创建账号失败'));
        }
    }

    async update(data) {
        const { ctx } = this;
        try {
            return await ctx.model.User.update(data);
        } catch (e) {
            ctx.logger.warn(e);
            ctx.throw(500, ctx.__('修改账号失败'));
        }
    }

    async destroy(id) {
        await this.ctx.model.User.destroy({ where: { id } });
    }

    async findCreateName(created_per_id){
        const {ctx} = this;
        const created_name = await ctx.model.User.findOne({
            where: {
                id: created_per_id,
            },
            attributes:['username'],
        })
        return created_name.dataValues.username;
    }


}

module.exports = UserService;
