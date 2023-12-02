const express = require("express");
const router = express.Router();
const passport = require("passport");
const { login, checkUser, signUp } = require("../controllers/authController");

router
  .post("/login", passport.authenticate("local"), login)
  .post("/register", signUp);
router.get("/", passport.authenticate("jwt"), checkUser);

module.exports = router;
