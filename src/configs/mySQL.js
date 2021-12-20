const mySql = require("mysql");

const {HOST, DB, PASSWORD, USER} = process.env;

// console.log(HOST)
// console.log(DB);
// console.log(PASSWORD);
// console.log(USER);

const db = mySql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DB,
  });
  
  db.connect((err) => {
    if (err) throw err;
    console.log("Database Connected");
  });

  module.exports = db