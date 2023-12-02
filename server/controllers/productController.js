const Product = require("../models/ProductModel");
const Category = require("../models/CategoryModel");
const Brand = require("../models/BrandModel");

const mongoose = require("mongoose");
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

    console.log(req.files);

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
    // Upload thumbnail to Cloudinary
    const thumbnailResponse = await uploadFileToCloudinary(
      thumbnailFile,
      "AnimeNookMarket"
    );

    let imagesResponse = [];

    // Check if there are images
    if (imagesFiles) {
      // Check if there is more than one image or only one
      if (Array.isArray(imagesFiles)) {
        // Validate file types for each image
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

        // Upload images to Cloudinary
        imagesResponse = await Promise.all(
          imagesFiles.map((imageFile) =>
            uploadFileToCloudinary(imageFile, "AnimeNookMarket")
          )
        );
      } else {
        // Validate file type for a single image
        if (
          !isFileTypeSupported(
            imagesFiles.name.split(".")[1].toLowerCase(),
            supportedTypes
          )
        ) {
          return res.status(400).json({
            success: false,
            message: "Image file format not supported",
          });
        }

        // Upload a single image to Cloudinary
        imagesResponse = [
          await uploadFileToCloudinary(imagesFiles, "AnimeNookMarket"),
        ];
      }
    }

    // Save the product to the database
    const newProduct = await new Product({
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
    }).populate("category brand");

    const product = await newProduct.save();

    return res.status(200).json({
      success: true,
      message: "Product added successfully",
      product,
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
    const products = await Product.find().populate("category brand");

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
    const product = await Product.findById(productId).populate(
      "category brand"
    );

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
    ).populate("category brand");

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
const getAllProductsByFilter = async (req, res) => {
  try {
    const { _sort, _order, _page, _limit = 10, category, brand } = req.query;
    //TODO:Get sorting based on discounted price not actual price
    // Construct the filter object
    const filter = {};

    // Handle category and brand filters
    if (category) {
      const categoryId = Array.isArray(category)
        ? category.map((id) => new mongoose.Types.ObjectId(id))
        : new mongoose.Types.ObjectId(category);

      filter.$or = [{ category: { $in: categoryId } }];
    }

    if (brand) {
      const brandId = Array.isArray(brand)
        ? brand.map((id) => new mongoose.Types.ObjectId(id))
        : new mongoose.Types.ObjectId(brand);

      const brandFilter = { brand: { $in: brandId } };
      filter.$or = filter.$or ? [...filter.$or, brandFilter] : [brandFilter];
    }

    // Handle sorting
    const sortObj =
      _sort && _order ? { [_sort]: _order === "asc" ? 1 : -1 } : {};

    // Handle pagination
    const limitValue = parseInt(_limit);
    const skipValue = (_page - 1) * limitValue;

    // Get the total count of documents after applying the filter
    const totalItems = await Product.countDocuments(filter);

    // Query and populate
    const products = await Product.find(filter)
      .sort(sortObj)
      .skip(skipValue)
      .limit(limitValue)
      .populate("category brand");

    return res.status(200).json({
      success: true,
      data: { products, totalItems },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
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
  getAllProductsByFilter,
};
