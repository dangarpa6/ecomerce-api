const Car = require("../models/carModel");
const Order = require("../models/orderModel");
const ProductInCar = require("../models/productInCarModel");
const ProductInOrder = require("../models/productInOrderModel");

const addOrder = async (req, res) => {
  const userId = req.user;

  const car = await Car.findOne({ where: { userId } });

  if (!car) {
    res.status(404).json({ status: "fail", message: "No existe el carrito" });
  }

  const productsInCar = await ProductInCar.findAll({
    where: { carId: car.id },
  });

  const newOrder = await Order.create({
    userId,
  });

  let totalPrice = 0;

  const productOrder = productsInCar.map((product) => {
    totalPrice += product.price * product.quantity;
    return {
      orderId: newOrder.id,
      productId: product.productId,
      quantity: product.quantity,
      price: product.price,
      status: "purchased",
    };
  });

  newOrder.totalPrice = totalPrice;
  await newOrder.save();

  const newProductsInOrder = await ProductInOrder.bulkCreate(productOrder);

  res.status(200).json({ status: "success", newProductsInOrder });
};

const readyOrder = async(req,res) =>{

  const { id } = req.params
  const userId = req.user

  const order = await Order.findOne({where:{ id }})

  order.status = "check"
  await order.save()

  const car = await Car.findOne({ where: { userId } })
  car.destroy()

 res.status(200).json({ status: 'success' })
}

module.exports = { addOrder, readyOrder };
