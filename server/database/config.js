'use strict';

module.exports = {
  development: {
    username: 'root',
    password: '123456',
    database: 'info_administer',
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
    migrationStorageTableName: 'sequelize_meta',
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data',
  },
  test: {
    username: 'root',
    password: '123456',
    database: 'info_administer',
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
    migrationStorageTableName: 'sequelize_meta',
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data',
  },
  production: {
    dialect: 'mysql',
    database: process.env.MYSQL_DATABASE || 'info_administer',
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || '3306',
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '123456',
    migrationStorageTableName: 'sequelize_meta',
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data',
  },
};
