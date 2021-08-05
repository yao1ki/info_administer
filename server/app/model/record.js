'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const Record = app.model.define('record', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_id:STRING,
    ghost_id:STRING,
    operation: STRING,

    created_at: { type: app.Sequelize.DATE, defaultValue: app.Sequelize.fn('NOW') },
    updated_at: { type: app.Sequelize.DATE, defaultValue: app.Sequelize.fn('NOW') },
  });

  Record.associate = function() {
    app.model.Record.belongsTo(app.model.Ghost, { foreignKey: 'ghost_id', targetKey: 'id',});
    app.model.Record.belongsTo(app.model.User, { foreignKey: 'user_id', targetKey: 'id',});

  }
  return Record;
}