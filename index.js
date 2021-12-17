const express = require("express");
const mySql = require("mysql");
const logger = require("morgan");

const app = express();

const port = 8000;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

app.use(logger("dev"));
// body parser
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Welcome to beLaundry Made By Akbar Zulfikar");
});

const db = mySql.createConnection({
  host: "localhost",
  user: "akbar",
  password: "31maret",
  database: "belaundry",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database Connected");
});

app.get("/products", (_, res) => {
  const getAllProducts = new Promise((resolve, reject) => {
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
  getAllProducts
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/products", (req, res) => {
  const { body } = req;
  const insertBody = { ...body };
  const postNewProduct = new Promise((resolve, reject) => {
    const queryString = "INSERT INTO products SET ?";
    db.query(queryString, insertBody, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
  postNewProduct
    .then((data) => {
      const resObject = {
        msg: "Success",
        data: {
          id: data.insertId,
          ...insertBody,
        },
      };
      res.json(resObject);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/product/:id", (req, res) => {
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
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
