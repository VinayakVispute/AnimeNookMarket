const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  getAllProductsByFilter,
} = require("../controllers/productController");

// Routes
router.get("/", getAllProductsByFilter).get("/:id", getProductById);
router.post("/", createProduct);
router.patch("/:id", updateProductById);

module.exports = router;
