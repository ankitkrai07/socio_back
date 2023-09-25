const express = require("express");
const router = express.Router();
const { userModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { name, email, gender, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.json({ message: "You are already registered, Please Login!" });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await userModel.create({
      name,
      email,
      gender,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.find({ email });

    if (existingUser.length === 0) {
      return res.json("You are not registered user!");
    }
    const checkPass = await bcrypt.compare(password, existingUser[0].password);

    if (!checkPass) {
      return res.json("Wrong Credentials!!");
    }

    const token = jwt.sign({ userId: existingUser[0]._id }, "masai");
    return res.json({ email, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
