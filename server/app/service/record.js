'use strict';

const Service = require('egg').Service;

class RecordService extends Service {
    async show(id) {
        const { ctx } = this;
        const shop = await ctx.model.Record.findByPk(id);
        if (!shop) {
            ctx.throw(404, ctx.__('账号未找到'));
        }
        return shop;
    }









}

module.exports = RecordService;
