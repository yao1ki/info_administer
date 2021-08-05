'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.removeColumn('ghosts','user');

    await queryInterface.addColumn('ghosts','user_id',{ type:STRING});

  },
  
};