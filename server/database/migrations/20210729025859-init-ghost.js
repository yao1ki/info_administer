'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.removeColumn('ghosts','state');

    await queryInterface.addColumn('ghosts','state',{ type:STRING ,defaultValue:"1"});

  },
  
};