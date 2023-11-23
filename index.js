const express = require("express");
const moment = require("moment");
const { query } = require("./database/db");
require("dotenv").config();
const mysql = require("mysql2");

const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.APP_PORT;

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

const userRoute = require("./routes/user.route");
const textRoute = require("./routes/text.route");
const resultRoute = require("./routes/result.route");
app.get("/", (req, res) => {
  res.status(200).json({ message: "This is the home page" });
});

app.use("/api/users", userRoute);
app.use("/api/text", textRoute);
app.use("/api/result", resultRoute);

app.listen(port, () => {
  console.log(`my app is listening ${port}`);
});
