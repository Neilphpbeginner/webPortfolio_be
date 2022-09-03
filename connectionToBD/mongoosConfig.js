const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

module.export = mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASEUSER}:${process.env.DATABASEPASSWORD}@test.gumuz.mongodb.net/futureemployers?retryWrites=true&w=majority`
  )
  .then((response) => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });
