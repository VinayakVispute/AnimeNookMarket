const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [0, "Price cannot be negative."],
    },
    discountPercentage: {
      type: Number,
      required: [true, "Discount percentage is required."],
      min: [0, "Discount percentage cannot be negative."],
      max: [100, "Discount percentage cannot be greater than 100."],
      default: 0,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required."],
      min: [0, "Rating cannot be less than 0."],
      max: [5, "Rating cannot be greater than 5."],
      default: 0,
    },
    stock: {
      type: Number,
      required: [true, "Stock is required."],
      min: [0, "Stock cannot be less than 0."],
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required."],
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "Brand is required."],
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail URL is required."],
    },
    images: {
      type: [String],
      required: [true, "Images are required."],
    },
    isDeleted: {
      type: Boolean,
      required: [true, "Deletion status is required."],
      default: false,
    },
  },
  { timestamps: true }
);

const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Product", productSchema);
