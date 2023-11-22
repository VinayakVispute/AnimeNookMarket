const Product = require("../models/ProductModel");

const {
  isFileTypeSupported,
  uploadFileToCloudinary,
} = require("../utils/cloudinary");

const createProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      discountPercentage,
      rating,
      category,
      brand,
      stock,
    } = req.body;

    // Assuming you're handling file uploads and the files are available in req.files
    const thumbnailFile = req.files.thumbnail;
    const imagesFiles = req.files.images;

    // Validate file types
    const supportedTypes = ["jpg", "jpeg", "png"];

    if (
      !isFileTypeSupported(
        thumbnailFile.name.split(".")[1].toLowerCase(),
        supportedTypes
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail file format not supported",
      });
    }

    if (
      !imagesFiles.every((file) =>
        isFileTypeSupported(
          file.name.split(".")[1].toLowerCase(),
          supportedTypes
        )
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Some image files have an unsupported format",
      });
    }

    // Upload thumbnail to Cloudinary
    const thumbnailResponse = await uploadFileToCloudinary(
      thumbnailFile,
      "AnimeNookMarket"
    );

    // Upload images to Cloudinary
    const imagesResponse = await Promise.all(
      imagesFiles.map((imageFile) =>
        uploadFileToCloudinary(imageFile, "AnimeNookMarket")
      )
    );
    console.log(thumbnailResponse);
    // Save the product to the database
    const newProduct = await Product.create({
      title,
      price,
      description,
      discountPercentage,
      rating,
      category,
      brand,
      stock,
      thumbnail: thumbnailResponse.data.secure_url,
      images: imagesResponse.map((image) => image.data.secure_url),
    });

    // Save the product to the database
    // await product.save();

    return res.status(200).json({
      success: true,
      message: "Product added successfully",
      newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    // Find the product by ID in the database
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error getting product by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateProductById = async (req, res) => {
  const productId = req.params.id;
  const updateData = req.body;

  try {
    // Find the product by ID in the database and update it
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
};
