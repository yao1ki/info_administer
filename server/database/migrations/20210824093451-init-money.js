'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.removeColumn('ghosts','rein');

    await queryInterface.addColumn('ghosts','rein_id',{ type: INTEGER});

  },
  
};