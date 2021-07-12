'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.addColumn('users','e_mile',{ type:STRING });
    await queryInterface.removeColumn('users','e-mile');

  },
  
};