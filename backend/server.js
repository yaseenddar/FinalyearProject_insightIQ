const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();

const db = require("./config/database");
const router = require("./routes");

//database connection
const PORT = 4000;
db();

//middle ware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//cors

app.use(cors());
app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/api", router);

app.use("/uploads", express.static(path.join(__dirname, "/public/images")));

app.get("*", (req, res) => {
  try {
    res.send("Oops! no page at this url");
  } catch (e) {
    res.send("Oops! unexpected error");
  }
});
//server listeniprocess.env.portng
app.listen(PORT, () => {
  console.log(`Listening on port no ${PORT}`);
});
