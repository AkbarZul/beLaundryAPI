const productsModel = require("../models/products");
const form = require("../helpers/form");

module.exports = {
  productsAll: (_, res) => {
    productsModel
      .productAll()
      .then((data) => {
        form.success(res, data);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  postProduct: (req, res) => {
    const { body } = req;
    console.log(req.files)
    const filepath = JSON.stringify(
      req.files.map(
        (e) => "/images" + "/" + e.filename + " "
      )
    );
    const insertBody = { ...body, image: filepath };

    productsModel
      .postProduct(insertBody)
      .then((data) => {
        const resObject = {
          id: data.insertId,
          ...insertBody,
        };
        form.success(res, resObject);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
};
