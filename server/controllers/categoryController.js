const Category = require("../models/CategoryModel");

const createCategory = async (req, res) => {
  try {
    const { label } = req.body;

    // Save the Category to the database
    const newCategory = await Category.create({
      label,
    });

    return res.status(200).json({
      success: true,
      message: "Category added successfully",
      newCategory,
    });
  } catch (error) {
    console.error("Error creating Category :", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    // Fetch all Categorys from the database
    const categories = await Category.find();

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching Categories:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    // Find the Category by ID in the database
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Error getting category by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateCategoryById = async (req, res) => {
  const categoryId = req.params.id;
  const { label } = req.body;

  try {
    const value = label.toLowerCase().replace(/\s+/g, "-");
    const updateData = { label, value };
    // Find the Category by ID in the database and update it
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updateData,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating Category by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
};
