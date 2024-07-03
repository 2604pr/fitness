const express = require("express");

const User = require("../models/userModel");

// importing token
const createToken = require("../utils/createToken");

module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    //create token
    const token = createToken(res, user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.signUp(name, email, password);
    //create token
    const token = createToken(res, user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.userLogout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "user logged out" });
};
