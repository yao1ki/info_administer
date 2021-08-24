'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('money', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      remittor: STRING,
      number:STRING,
      comment:STRING,
      address: STRING,
      payee: STRING,
      created_at: { type: DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: DATE, defaultValue: Sequelize.fn('NOW') },
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  // down: async queryInterface => {
  //   await queryInterface.dropTable('users');
  // },
};
