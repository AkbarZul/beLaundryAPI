const express = require("express");

const mainRouter = express.Router();

const welcomeRouter = require('./welcome')
const productsRouter = require('./products');
const productRouter = require('./product');

mainRouter.use("/", welcomeRouter);
mainRouter.use("/products", productsRouter);
mainRouter.use("/product", productRouter);

module.exports = mainRouter;