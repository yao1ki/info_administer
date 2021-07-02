'use strict';
const moment = require('moment');

const defaultStatus = 404;

module.exports = {

  /**
   * 格式化日期
   */

  weekday(date) {
    return moment(date).isoWeekday() - 1;
  },

  /**
   * 格式化日期
   */

  formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  },

  /**
   * 格式化时间
   */

  formatDatetime(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  },

  /**
   * 定义返回数据格式
   */

  success(data, meta) {
    return Object.assign({
      code: this.status !== defaultStatus ? this.status : 200,
      data,
    }, meta);
  },

};
