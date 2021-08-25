
'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const Rein = app.model.define('rein', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name:STRING,
    created_at: { type: app.Sequelize.DATE, defaultValue: app.Sequelize.fn('NOW') },
    updated_at: { type: app.Sequelize.DATE, defaultValue: app.Sequelize.fn('NOW') },
  });
  Rein.associate = function() {
    // app.model.Ghost.belongsToMany(app.model.User, { foreignKey: 'ghost_id',through: 'Order'})
    app.model.Rein.belongsTo(app.model.Ghost, { foreignKey: 'id', targetKey: 'id',});
   }


 

  
  return Rein;
}
