'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.removeColumn('orders','state');
    await queryInterface.addColumn('orders','state',{ type:STRING ,defaultValue:"0"});

  },
  
};