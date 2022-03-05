let express = require("express");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let dotenv = require("dotenv");
let cors = require("cors");
let PORT = process.env.PORT || 8080;

let emailRouter = require("./routes/emailRouter");
let app = express();

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
