'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.removeColumn('materials','auth');

    await queryInterface.addColumn('materials','auth',{ type: INTEGER,defaultValue:0});

  },
  
};