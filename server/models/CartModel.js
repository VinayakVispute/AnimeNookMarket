const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: [true, "Quantity is required."],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required."],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product is required."],
  },
});

const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Cart", cartSchema);
