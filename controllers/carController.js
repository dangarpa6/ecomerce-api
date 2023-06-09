const Car = require("../models/carModel");
const ProductInCar = require("../models/productInCarModel");
const Product = require("../models/productModel");

const addProduct = async (req, res) => {
  const userId = req.user;
  const { productId, quantity } = req.body;
  let carId;

  const car = await Car.findOne({ where: { userId } });

  if (!car) {
    let car = await Car.create({ userId });
    carId = car.id;
  } else {
    carId = car.id;
  }

  const product = await Product.findOne({ where: { id: productId } });

  const addNewProduct = await ProductInCar.create({
    carId,
    productId,
    quantity,
    price: product.price,
  });

  res.status(200).json({ status: "success", addNewProduct });
};

const getAllProductsInCar = async (req, res) => {
  const userId = req.user;

  const car = await Car.findOne({ where: { userId } });

  const productsInCar = await ProductInCar.findAll({
    where: { carId: car.id },
  });

  console.log(productsInCar);

  res.status(200).json({ status: "success", productsInCar });
};

module.exports = { addProduct, getAllProductsInCar };
