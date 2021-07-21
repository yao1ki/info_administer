'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const Ghost = app.model.define('ghost', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    lifetime:STRING,
    cause:STRING,
    sort:STRING,
    state:STRING,
    ghost_id:STRING,
    deathtime:STRING,
    emissary_id:STRING,
    reason:STRING,
    returntime:STRING,
    created_at: { type: app.Sequelize.DATE, defaultValue: app.Sequelize.fn('NOW') },
    updated_at: { type: app.Sequelize.DATE, defaultValue: app.Sequelize.fn('NOW') },
  });

  return Ghost;
};
