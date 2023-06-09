const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const ProductInCar = db.define("productincar", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  carId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  productId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "active",
  },
});

module.exports = ProductInCar;
