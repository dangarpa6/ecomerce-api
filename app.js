const express = require("express");
const cors = require('cors');
const { userRoutes } = require("./routes/userRouter");
const { productRoutes } = require("./routes/productRouter");
const { carRoutes } = require("./routes/carRouter");
const { orderRoutes } = require("./routes/orderRouter");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/car", carRoutes);
app.use("/api/v1/order", orderRoutes);

module.exports = app;
