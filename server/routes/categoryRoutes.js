const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
} = require("../controllers/categoryController");

// Routes
router.get("/", getAllCategories).get("/:id", getCategoryById);

router.post("/", createCategory);

router.put("/:id", updateCategoryById);

module.exports = router;
