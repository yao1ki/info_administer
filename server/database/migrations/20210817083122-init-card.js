'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;

    await queryInterface.addColumn('ghosts','gnosis',{ type: STRING});

  },
  
};

