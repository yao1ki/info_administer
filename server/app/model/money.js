
'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const Money = app.model.define('money', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    remittor: STRING,
    number: STRING,
    comment: STRING,
    address: STRING,
    payee: STRING,
    created_at: { type: app.Sequelize.DATE, defaultValue: app.Sequelize.fn('NOW') },
    updated_at: { type: app.Sequelize.DATE, defaultValue: app.Sequelize.fn('NOW') },
  });
  Money.associate = function() {
    // app.model.Ghost.belongsToMany(app.model.User, { foreignKey: 'ghost_id',through: 'Order'})
    app.model.Money.belongsTo(app.model.User, { foreignKey: 'remittor', targetKey: 'id',});
   }


 

  
  return Money;
}
