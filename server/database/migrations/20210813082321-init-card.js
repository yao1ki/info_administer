'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.addColumn('ghosts','time_start',{ type:DATE });
    await queryInterface.addColumn('ghosts','time_end',{ type:DATE });

  },
};