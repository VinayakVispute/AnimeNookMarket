const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        type: mongoose.Schema.Types.Mixed,
        required: [true, "Selected Address is requried"],
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required."],
    },
    totalItems: { type: Number, required: [true, "Total items is required."] },
    selectedAddress: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "Selected Address is requried"],
    },
    paymentMethod: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["Pending", "Dispatched", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
