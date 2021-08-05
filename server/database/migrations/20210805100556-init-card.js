'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.removeColumn('ghosts','deathtime');
    await queryInterface.removeColumn('ghosts','emissary_id');
    await queryInterface.removeColumn('ghosts','returntime');


  },
  
};