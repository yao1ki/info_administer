'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.removeColumn('ghosts','manager');

    await queryInterface.addColumn('ghosts','user',{ type:STRING});

  },
  
};