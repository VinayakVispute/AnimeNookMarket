const express = require("express");
const router = express.Router();
const passport = require("passport");
const { login, checkUser, signUp } = require("../controllers/authController");

const check = (req, res, next) => {
  console.log("Checking user");
  next();
};

router
  .post("/login", check, passport.authenticate("local"), login)
  .post("/register", signUp);
router.get("/", passport.authenticate("jwt"), checkUser);

module.exports = router;
