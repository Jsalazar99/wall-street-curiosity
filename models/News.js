const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class News extends Model {}

News.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    summary: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'news',
  }
);

module.exports = News;
