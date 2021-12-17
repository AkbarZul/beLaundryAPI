const express = require("express");

const productRouter = express.Router();

const db = require("../configs/mySQL");

productRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const getSingleProduct = new Promise((resolve, reject) => {
    const queryString =
      "SELECT p.id, p.product_name, p.product_price, p.product_description, c.category_name FROM products AS p JOIN category AS c ON c.id = p.category_id WHERE p.id = ?";
    db.query(queryString, id, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
  getSingleProduct
    .then((data) => {
      if (data.length) {
        res.json(data);
      } else {
        res.status(404).json({
          msg: "Data Not Found",
        });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = productRouter;
