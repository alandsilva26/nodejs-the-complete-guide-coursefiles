const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('mydb', 'root', 'root', { host: "localhost", dialect: "mysql" });

module.exports = sequelize;