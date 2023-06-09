const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const db = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false}},
});

module.exports = db;
