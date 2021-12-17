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
    const insertBody = { ...body };

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
