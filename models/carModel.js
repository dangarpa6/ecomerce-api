const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const Car = db.define("car", {
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
});

module.exports = Car;
