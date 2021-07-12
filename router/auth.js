const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../models/userschema");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.send("hello yolo router");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "fill all fields" });
  }
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(422).json({ error: "email already exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password dont match" });
    } else {
      const user = new User({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      });
      await user.save();
      res.status(201).json({ message: "registration successfull" });
    }
  } catch (error) {
    console.log(error);
    window.alert(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: "fill the data" });
    }

    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "invalid credentials" });
      } else {
        res.status(400).json({ message: "signin successfull" });
      }
    } else {
      res.status(400).json({ error: "invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
