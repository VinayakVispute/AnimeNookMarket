const mongoose = require("mongoose");
const Category = require("../models/CategoryModel");
require("dotenv").config();

const categories = [
  {
    value: "smartphones",
    label: "Smartphones",
    checked: false,
  },
  {
    value: "laptops",
    label: "Laptops",
    checked: false,
  },
  {
    value: "fragrances",
    label: "Fragrances",
    checked: false,
  },
  {
    value: "skincare",
    label: "Skincare",
    checked: false,
  },
  {
    value: "groceries",
    label: "Groceries",
    checked: false,
  },
  {
    value: "home-decoration",
    label: "Home decoration",
    checked: false,
  },
  {
    value: "furniture",
    label: "Furniture",
    checked: false,
  },
  {
    value: "tops",
    label: "Tops",
    checked: false,
  },
  {
    value: "womens-dresses",
    label: "Womens dresses",
    checked: false,
  },
  {
    value: "womens-shoes",
    label: "Womens shoes",
    checked: false,
  },
  {
    value: "mens-shirts",
    label: "Mens shirts",
    checked: false,
  },
  {
    value: "mens-shoes",
    label: "Mens shoes",
    checked: false,
  },
  {
    value: "mens-watches",
    label: "Mens watches",
    checked: false,
  },
  {
    value: "womens-watches",
    label: "Womens watches",
    checked: false,
  },
  {
    value: "womens-bags",
    label: "Womens bags",
    checked: false,
  },
  {
    value: "womens-jewellery",
    label: "Womens jewellery",
    checked: false,
  },
  {
    value: "sunglasses",
    label: "Sunglasses",
    checked: false,
  },
  {
    value: "automotive",
    label: "Automotive",
    checked: false,
  },
  {
    value: "motorcycle",
    label: "Motorcycle",
    checked: false,
  },
  {
    value: "lighting",
    label: "Lighting",
    checked: false,
  },
];
function capitalizeFirstLetterEachWord(string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
// Function to extract labels and upload to MongoDB
async function uploadLabelsToMongoDB() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Delete all existing documents in the Category collection
    await Category.deleteMany({});

    // Use map to transform the categories directly

    const labels = categories.map(({ label }) => ({
      label: capitalizeFirstLetterEachWord(label),
    }));

    // Use try-with-resources for MongoDB operations
    await Category.create(labels);

    console.log("Labels uploaded to MongoDB successfully!");
  } catch (error) {
    console.error("Error uploading labels to MongoDB:", error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
  }
}

// Call the function to upload labels
uploadLabelsToMongoDB();
