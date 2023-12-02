const express = require("express");
const router = express.Router();
const {
  getUserById,
  updateUserById,
} = require("../controllers/userController");
const {
  deleteAddress,
  updateAddressById,
} = require("../controllers/addressController");

const { addAddressToUser } = require("../controllers/addressController");

router.get("/user", getUserById);
router.post("/address", addAddressToUser);
router
  .patch("/address/:addressId", updateAddressById)
  .patch("/", updateUserById);
router.delete("/address/:addressId", deleteAddress);

module.exports = router;
