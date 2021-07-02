/* eslint valid-jsdoc: "off" */

'use strict';

const dbConfig = require('../database/config').development;

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1625201465919_6048';

  // add your middleware config here
  config.middleware = [];

  config.sequelize = {
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    define: {
      underscored: true,
      underscoredAll: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    timezone: '+08:00',
  };

  config.security = {
    csrf: {
      enable: false,
      //ignoreJSON: true,
    },
    //domainWhiteList: ["http://localhost:5000"],
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.jwt = {
    secret: config.keys,
    enable: true,
    match(ctx) {
      const ignoreUrls = ['/api/login',];
      const url = ctx.request.url;
      return !ignoreUrls.some(v => url.indexOf(v) > -1);
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
