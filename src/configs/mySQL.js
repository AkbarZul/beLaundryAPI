const mySql = require("mysql");

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

  module.exports = db