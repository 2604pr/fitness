const jwt = require("jsonwebtoken");

const createToken = (res, _id) => {
  const token = jwt.sign({ _id }, process.env.JWT_secret, { expiresIn: "3d" });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "Strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
  return token;
};

module.exports = createToken;
