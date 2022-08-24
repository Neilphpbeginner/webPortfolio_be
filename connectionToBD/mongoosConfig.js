const mongoose = require("mongoose");

module.export = mongoose
  .connect(
    "mongodb+srv://Neil:6UPKSTfUgEaFMWai@test.gumuz.mongodb.net/futureemployers?retryWrites=true&w=majority"
  )
  .catch((error) => {
    console.log(error);
  });
