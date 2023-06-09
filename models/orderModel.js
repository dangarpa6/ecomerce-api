const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const Order = db.define("order", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  totalPrice: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
});

module.exports = Order;
