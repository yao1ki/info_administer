"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const Tool = app.model.define("tool", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    titles: STRING,
    covers: STRING,
    desc: STRING,
    year: STRING,
    user_id: STRING,
    servicelife:STRING,
    created_at: {
      type: app.Sequelize.DATE,
      defaultValue: app.Sequelize.fn("NOW"),
    },
    updated_at: {
      type: app.Sequelize.DATE,
      defaultValue: app.Sequelize.fn("NOW"),
    },
  });
  Tool.associate = function() {

   app.model.Tool.belongsTo(app.model.User, { foreignKey: 'user_id', targetKey: 'id',});

  }



  return Tool;
};