const dotenv = require("dotenv");
const express = require("express");
const app = express();
dotenv.config({ path: "./config.env" });
require("./db/conn");
app.use(express.json());
const port = process.env.PORT;
app.use(require("./router/auth"));
app.get("/about", (req, res) => {
  res.send("hello about world from da server");
});
app.get("/contact", (req, res) => {
  res.send("hello contact world from da server");
});
app.get("/signin", (req, res) => {
  res.send("hell osignin world from da server");
});
app.get("/signup", (req, res) => {
  res.send("hell osignup world from da server");
});

app.listen(port, () => {
  console.log(`connected succesfully at port ${port}`);
});
