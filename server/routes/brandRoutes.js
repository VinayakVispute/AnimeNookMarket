const express = require("express");
const router = express.Router();
const {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrandById,
} = require("../controllers/BrandController");

// Routes
router.get("/", getAllBrands).get("/:id", getBrandById);

router.post("/", createBrand);

router.put("/:id", updateBrandById);

module.exports = router;
