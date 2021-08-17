'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('materials', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      picture: STRING,
      quantity:STRING,
      created_at: { type: DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: DATE, defaultValue: Sequelize.fn('NOW') },
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  // down: async queryInterface => {
  //   await queryInterface.dropTable('users');
  // },
};
