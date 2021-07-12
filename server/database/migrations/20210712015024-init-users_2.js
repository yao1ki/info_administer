'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.addColumn('users','address',{ type:STRING });
    await queryInterface.addColumn('users','e-mile',{ type:STRING });
    await queryInterface.addColumn('users','telephone',{ type:STRING });

  },
  
};