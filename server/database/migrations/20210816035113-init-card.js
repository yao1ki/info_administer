'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.removeColumn('users','auth');

    await queryInterface.addColumn('users','auth',{ type: INTEGER,defaultValue:0});

  },
  
};