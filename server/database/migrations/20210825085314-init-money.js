'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.removeColumn('ghosts','lifetime');

    await queryInterface.addColumn('ghosts','lifetime',{ type: INTEGER,defaultValue:0});

  },
  
};