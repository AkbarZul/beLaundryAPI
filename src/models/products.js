const db = require("../configs/mySQL");

module.exports = {
  productAll: () => {
    return new Promise((resolve, reject) => {
      const queryString =
        "SELECT p.id, p.product_name, p.product_price, c.category_name FROM products AS p JOIN category AS c ON c.id = p.category_id";
      db.query(queryString, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  postProduct: (insertBody) => {
      return new Promise((resolve, reject) => {
        const queryString = "INSERT INTO products SET ?";
        db.query(queryString, insertBody, (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        });
      });
  }
};
