'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const Ghost = app.model.define('ghost', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    lifetime:STRING,
    cause:STRING,
    sort:STRING,
    ghost_id:STRING,
    state:STRING,
    reason:STRING,
    user_id:STRING,
    rein:STRING,
    created_at: { type: app.Sequelize.DATE, defaultValue: app.Sequelize.fn('NOW') },
    updated_at: { type: app.Sequelize.DATE, defaultValue: app.Sequelize.fn('NOW') },
  });

  Ghost.associate = function() {
   // app.model.Ghost.belongsToMany(app.model.User, { foreignKey: 'ghost_id',through: 'Order'})
   app.model.Ghost.hasMany(app.model.Record, { foreignKey: 'ghost_id', targetKey: 'id'})
   app.model.Ghost.belongsTo(app.model.User, { foreignKey: 'user_id', targetKey: 'id',});
    app.model.Ghost.hasMany(app.model.Order, { foreignKey: 'ghost_id', targetKey: 'id'})
  }
 

  
  return Ghost;
}