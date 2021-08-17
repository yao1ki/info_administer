"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, BOOLEAN, } = app.Sequelize;

  const Material = app.model.define("material", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    picture: STRING,
    unit:STRING,
    aa:STRING,
    quantity: STRING,
    created_at: {
      type: app.Sequelize.DATE,
      defaultValue: app.Sequelize.fn("NOW"),
    },
    updated_at: {
      type: app.Sequelize.DATE,
      defaultValue: app.Sequelize.fn("NOW"),
    },
  });

  return Material;
};
