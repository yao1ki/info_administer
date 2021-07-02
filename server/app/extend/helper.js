'use strict';
const moment = require('moment');
const Op = require('sequelize').Op;

const queryKeys = [ 'offset', 'limit', 'sortby', 'order' ];

const weekdays = [ '一', '二', '三', '四', '五', '六', '日' ];

module.exports = {

  curd(ctx, opts = { defaultPage: false }) {
    const opt = { where: {} };
    const query = ctx.query;

    if (query.offset) {
      const offset = parseInt(query.offset, 10);
      if (offset) opt.offset = offset;
    }
    if (query.limit) {
      const limit = parseInt(query.limit, 10);
      if (limit) opt.limit = limit;
      else if (opts.defaultPage) {
        opt.limit = 10;
      }
    } else if (opts.defaultPage) {
      opt.limit = 10;
    }
    if (query.sortby) {
      opt.sortby = query.sortby;
      opt.order = 'ASC';
    }
    if (query.order) {
      opt.order = String(query.order).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    }

    opt.where = {};
    Object.keys(query).forEach(k => {
      if (queryKeys.indexOf(k) === -1 && query[k]) {
        if (query[k].indexOf(',') > -1) {
          opt.where[k] = query[k].split(',');
        } else {
          opt.where[k] = query[k];
        }
      }
    });

    return opt;
  },

  parseJSON(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return null;
    }
  },

  async findOne(sql, replacements) {
    const ret = await this.ctx.model.query(sql, {
      replacements,
      type: this.ctx.model.QueryTypes.SELECT,
    });

    return ret && ret[0];
  },

  async query(sql, replacements) {
    const ret = await this.ctx.model.query(sql, {
      replacements,
      type: this.ctx.model.QueryTypes.SELECT,
    });

    return ret;
  },

  arr2map(arr, k = 'id') {
    const map = {};
    arr.map(v => (map[v[k]] = v));
    return map;
  },

  getWeekdayDesc(date) {
    return `周${weekdays[moment(date).isoWeekday() - 1]}`;
  },


  /**
   * 解析日期范围查询：beign end
   */

  parseDaterange(where) {
    const begin = where.begin ? moment(where.begin).startOf('d') : null;
    const end = where.end ? moment(where.end).endOf('d') : null;
    if (begin && end) {
      return { [Op.between]: [ begin, end ] };
    }
    if (begin) {
      return { [Op.gte]: begin };
    }
    if (end) {
      return { [Op.lte]: end };
    }
    return null;
  },

  // 清空redis缓存
  async clearRedisCache(pattarn) {
    const { app } = this;
    const redis = app.redis.get('cache');
    const keys = await redis.keys(pattarn);
    const pipeline = redis.pipeline();
    keys.forEach(k => pipeline.del(k));
    await pipeline.exec();
  },

  /**
   * 推送信息到前端
   */
  async sse(key, data, event) {
    this.app.redis.get('pub').publish('sse', JSON.stringify({
      keys: Array.isArray(key) ? key : [ key ],
      data,
      event,
    }));
  },
};
