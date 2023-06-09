const express = require("express");
const {
  getProductsHigher0,
  createProduct,
  editDescription,
} = require("../controllers/productController");
const { upload } = require("../utils/multer");
const { protectToken } = require("../middlewares/protectTokenMiddleware");

const router = express.Router();

router.get("/productgreater", getProductsHigher0);

router.use(protectToken);

router.post("/create", upload.single("img"), createProduct);
router.patch("/edit/:id", editDescription);

module.exports = { productRoutes: router };
