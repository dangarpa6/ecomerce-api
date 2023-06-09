const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const Product = require("../models/productModel");
const { Op } = require("sequelize");
const { storage } = require("../utils/firebase");
const User = require("../models/userModel");

const createProduct = async (req, res) => {
  const id = req.user;

  const imgRef = ref(storage, `daniel-node/product/${req.file.originalname}`);
  await uploadBytes(imgRef, req.file.buffer);
  const urlImg = await getDownloadURL(imgRef);

  req.body.productImage = urlImg;
  req.body.userId = id;

  const newProduct = await Product.create(req.body);

  res.status(200).json({ status: "success", newProduct });
};

const editDescription = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  const product = await Product.findOne({ where: { id } });

  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "No existe el producto",
    });
  }

  product.description = description;
  await product.save();

  res.status(200).json({ status: "success", product });
};

getProductsHigher0 = async (req, res) => {
  const products = await Product.findAll({
    where: {
      availableQty: {
        [Op.gt]: 0,
      },
    },
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
    ],
  });

  if (products.length === 0) {
    return res.status(404).json({
      message: "No hay productos con una cantidad mayor a 0",
    });
  }

  res.status(200).json({ status: "success", products });
};

module.exports = {
  getProductsHigher0,
  createProduct,
  editDescription,
};
