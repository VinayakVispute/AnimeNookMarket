const express = require("express");
const router = express.Router();
const {
  getUserById,
  updateUserById,
} = require("../controllers/userController");

router.get("/user", getUserById);

router.patch("/", updateUserById);

module.exports = router;
