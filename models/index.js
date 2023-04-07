const User = require('./User');
//const News = require('./News');
const Stocks = require('./Stocks');

// update the foreign keys????

User.hasMany(Stocks, {
  foreignKey: 'user_id',
});

Stocks.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Stocks };
