'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const Order = app.model.define('order', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_id:STRING,
    ghost_id:STRING,
    created_at: { type: app.Sequelize.DATE, defaultValue: app.Sequelize.fn('NOW') },
    updated_at: { type: app.Sequelize.DATE, defaultValue: app.Sequelize.fn('NOW') },
  });

  // 表关联的字段
  Order.associate = function() {
    // 一对多
    //app.model.Order.hasMany(app.model.Ghost, { foreignKey: 'ghost_id', targetKey: 'id'});
    app.model.Order.belongsTo(app.model.Ghost, { foreignKey: 'ghost_id', targetKey: 'id',});

    /**
     * Order.belongsTo(关联的模型, { foreignKey: '使用什么字段关联', targetKey: '与关联的模型那个字段关联', as: '别名' });
    */
    // 一对一
   app.model.Order.belongsTo(app.model.User, { foreignKey: 'user_id', targetKey: 'id',});
  }
 
  return Order;
}