const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/login", userController.userLogin);

router.post("/register", userController.userRegister);

router.post("/logout", userController.userLogout);

module.exports = router;
