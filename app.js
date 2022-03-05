const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const connectDB = require("./connectionToBD/mongoosConfig");
const PORT = process.env.PORT || 8080;
const dotenv = require("dotenv").config();

let emailRouter = require("./routes/emailRouter");
let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/email", emailRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log("Server up and running on port no. " + PORT);
});
