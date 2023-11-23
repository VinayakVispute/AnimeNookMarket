const Brand = require("../models/BrandModel");

const createBrand = async (req, res) => {
  try {
    const { label } = req.body;

    // Save the Brand to the database
    const newBrand = await Brand.create({ label });

    return res.status(201).json({
      success: true,
      message: "Brand added successfully",
      brand: newBrand,
    });
  } catch (error) {
    console.error("Error creating Brand:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllBrands = async (req, res) => {
  try {
    // Fetch all Brands from the database
    const brands = await Brand.find();

    return res.status(200).json({
      success: true,
      data: brands,
    });
  } catch (error) {
    console.error("Error fetching Brands:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getBrandById = async (req, res) => {
  const brandId = req.params.id;

  try {
    // Find the Brand by ID in the database
    const brand = await Brand.findById(brandId);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: brand,
    });
  } catch (error) {
    console.error("Error getting brand by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateBrandById = async (req, res) => {
  const brandId = req.params.id;
  const updateData = req.body;

  try {
    // Find the Brand by ID in the database and update it
    const updatedBrand = await Brand.findByIdAndUpdate(brandId, updateData, {
      new: true,
    });

    if (!updatedBrand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedBrand,
    });
  } catch (error) {
    console.error("Error updating Brand by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrandById,
};
