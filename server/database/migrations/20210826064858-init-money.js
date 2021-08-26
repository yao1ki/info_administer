'use strict';

const rein = require("../../app/model/rein");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.removeColumn('orders','rein_name')
    await queryInterface.addColumn('orders','rein_name',{ type: STRING});

  },


};
