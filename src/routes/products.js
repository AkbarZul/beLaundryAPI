const express = require("express");

const productsRouter = express.Router();


const productsController = require('../controllers/products')
const uploadImage = require("../helpers/middlewares/upload")

productsRouter.get("/", productsController.productsAll);

productsRouter.post("/", uploadImage, productsController.postProduct);

module.exports = productsRouter;
