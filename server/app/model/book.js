"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const User = app.model.define("book", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    author: STRING,
    category: STRING,
    ip:STRING,
    intro: STRING,
    created_at: {
      type: app.Sequelize.DATE,
      defaultValue: app.Sequelize.fn("NOW"),
    },
    updated_at: {
      type: app.Sequelize.DATE,
      defaultValue: app.Sequelize.fn("NOW"),
    },
  });

  return User;
};
