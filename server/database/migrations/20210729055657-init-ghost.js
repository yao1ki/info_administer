'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.removeColumn('ghosts','reason');

    await queryInterface.addColumn('ghosts','reason',{ type:STRING ,defaultValue:"生前作恶多端"});

  },
  
};