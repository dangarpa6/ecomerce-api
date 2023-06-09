const express = require("express");
const { protectToken } = require("../middlewares/protectTokenMiddleware");
const { addOrder, readyOrder } = require("../controllers/orderController");

const router = express.Router();

router.use(protectToken);
router.post("/add", addOrder);
router.patch("/ready/:id", readyOrder)

module.exports = { orderRoutes: router };
