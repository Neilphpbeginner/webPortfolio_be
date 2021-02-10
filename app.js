var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
var cors = require("cors");
var PORT = process.env.PORT || 8080;

var emailRouter = require("./routes/emailRouter");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
dotenv.config();

app.use("/email", emailRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log("Server up and running on port no. " + PORT);
});
