'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;

    await queryInterface.addColumn('tools','user',{ type:STRING });
    await queryInterface.addColumn('tools','year',{ type:STRING });

  },
  
};