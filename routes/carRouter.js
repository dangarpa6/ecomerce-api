const express = require("express");
const {
  addProduct,
  getAllProductsInCar,
} = require("../controllers/carController");
const { protectToken } = require("../middlewares/protectTokenMiddleware");

const router = express.Router();

router.use(protectToken);
router.post("/add", addProduct);
router.post("/view", getAllProductsInCar);

module.exports = { carRoutes: router };
