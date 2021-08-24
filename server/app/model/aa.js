'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const Aa = app.model.define('aa', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },

    created_at: { type: app.Sequelize.DATE, defaultValue: app.Sequelize.fn('NOW') },
    updated_at: { type: app.Sequelize.DATE, defaultValue: app.Sequelize.fn('NOW') },
  });



  
  return Aa;
}