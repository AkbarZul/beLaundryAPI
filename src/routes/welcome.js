const express = require('express')

const welcomeRouter = express.Router();

welcomeRouter.get("/", (_, res) => {
  res.send("Welcome to beLaundry Made By Akbar Zulfikar");
});

module.exports = welcomeRouter;
