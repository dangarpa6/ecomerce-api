const Car = require("./carModel");
const Product = require("./productModel");
const User = require("./userModel");
const ProductInCar = require("./productInCarModel");
const Order = require("./orderModel");

const initModel = () => {
  User.hasMany(Product);
  Product.belongsTo(User);

  User.hasOne(Car);
  Car.belongsTo(User);

  Car.hasMany(ProductInCar);
  ProductInCar.belongsTo(Car);

  User.hasMany(Order);
  Order.belongsTo(User);
};

module.exports = initModel;
