'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const User = app.model.define('fruit', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    breed: STRING,
    created_at: { type: app.Sequelize.DATE, defaultValue: app.Sequelize.fn('NOW') },
    updated_at: { type: app.Sequelize.DATE, defaultValue: app.Sequelize.fn('NOW') },
  });

  return User;
};
