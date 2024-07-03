const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_secret);

      req.user = await User.findById(decoded._id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ error: "Not authorized and invalid token" });
    }
  } else {
    res.status(401).json({ error: "Not authorized and no token " });
  }
};

module.exports = requireAuth;
