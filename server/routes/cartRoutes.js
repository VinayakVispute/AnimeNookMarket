const express = require("express");
const router = express.Router();

const {
  createCart,
  getCartByUserId,
  updateCartById,
  deleteCardById,
  resetCardByUserId,
} = require("../controllers/cartController");

router.get("/", getCartByUserId).get("/reset", resetCardByUserId);
router.post("/", createCart);
router.patch("/:id", updateCartById);
router.delete("/:id", deleteCardById);

module.exports = router;
