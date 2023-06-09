const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const User = db.define("user", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  username: {
    unique: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    unique: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  avatar: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});

module.exports = User;
