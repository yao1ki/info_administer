'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: STRING(128), allowNull: false, unique: true },
    password: { type: STRING(128), allowNull: false },
    address:STRING,
    telephone:STRING,
    e_mile:STRING,
    name: STRING,
    auth:INTEGER,
    potence:STRING,
    created_at: { type: app.Sequelize.DATE, defaultValue: app.Sequelize.fn('NOW') },
    updated_at: { type: app.Sequelize.DATE, defaultValue: app.Sequelize.fn('NOW') },
  });
  User.associate = function() {
    app.model.User.hasMany(app.model.Order, { foreignKey: 'user_id', targetKey: 'id'})
   // app.model.User.belongsToMany(app.model.Ghost, { foreignKey: 'user_id', through: 'Order'});
   app.model.User.hasMany(app.model.Record, { foreignKey: 'user_id', targetKey: 'id'})
   app.model.User.hasMany(app.model.Ghost, { foreignKey: 'user_id', targetKey: 'id'})


  }
 
  return User;
};
