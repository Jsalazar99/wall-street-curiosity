const sequelize = require('../config/connection');
const { User, Stocks, News } = require('../models');

const userData = require('./userData.json');
const newsData = require('./newsData.json');
// stockData is not being used yet
const stocksData = require('./stocksData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // more updating here
  for (const project of newsData) {
    await News.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
