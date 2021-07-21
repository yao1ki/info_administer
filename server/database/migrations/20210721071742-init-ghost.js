'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.addColumn('ghosts','deathtime',{ type:STRING });
    await queryInterface.addColumn('ghosts','emissary_id',{ type:STRING });
    await queryInterface.addColumn('ghosts','reason',{ type:STRING });
    await queryInterface.addColumn('ghosts','returntime',{ type:STRING });

  },
  
};