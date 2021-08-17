'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.removeColumn('users','quantity');
    await queryInterface.addColumn('ghosts','quantity',{ type: Number});

  },
  
};