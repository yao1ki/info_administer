'use strict';

const Service = require('egg').Service;

class JournalService extends Service {
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
        opt.order = [["id", "ASC"]];
        return await ctx.model.Journal.findAndCountAll(opt);
      }
      async create(data) {

        const { ctx } = this;
        try {
          await ctx.model.Journal.create(data);
          return;
        } catch (e) {
          ctx.logger.warn(e);
          ctx.throw(500, ctx.__("创建失败"));
        }
      }
    
    






}

module.exports = JournalService;
