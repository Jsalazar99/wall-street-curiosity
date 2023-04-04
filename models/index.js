const User = require('./User');
const News = require('./News');
const Stocks = require('./Stocks');

// update the foreign keys????
User.hasMany(News, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Stocks, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});


Project.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, News, Stocks };
