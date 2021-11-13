const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database.js");

const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: DataTypes.DOUBLE,
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
});

module.exports = Product;
