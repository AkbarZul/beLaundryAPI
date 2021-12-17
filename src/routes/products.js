const express = require("express");

const productsRouter = express.Router();


const productsController = require('../controllers/products')

productsRouter.get("/", productsController.productsAll);

productsRouter.post("/", productsController.postProduct);

module.exports = productsRouter;
