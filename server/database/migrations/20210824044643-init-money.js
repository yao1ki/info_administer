'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.removeColumn('tools','user');

    await queryInterface.addColumn('tools','user_id',{ type: INTEGER});

  },
  
};