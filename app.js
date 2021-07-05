const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config({ path: "./config.env" });
require("./db/conn");
app.use(require("./router/auth"));

const port = process.env.PORT;

//middleware
// const middleware = (req, res, next) => {
//   console.log(" this is my middleware");
//   next();
// };

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("hello world from da my hello server");
// });
// app.get("/about", middleware, (req, res) => {
//   res.send("hello about world from da server");
// });
// app.get("/contact", (req, res) => {
//   res.send("hello contact world from da server");
// });
// app.get("/signin", (req, res) => {
//   res.send("hell osignin world from da server");
// });
// app.get("/signup", (req, res) => {
//   res.send("hell osignup world from da server");
// });

app.listen(port, () => {
  console.log(`connected succesfully at port ${port}`);
});
