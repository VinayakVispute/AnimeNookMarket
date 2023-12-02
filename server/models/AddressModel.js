const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required."],
  },
  street: {
    type: String,
    required: [true, "Street address is required."],
  },
  city: {
    type: String,
    required: [true, "City is required."],
  },
  state: {
    type: String,
    required: [true, "State is required."],
  },
  pinCode: {
    type: String,
    required: [true, "Pin code is required."],
  },
  country: {
    type: String,
    required: [true, "Country is required."],
  },
});

const virtual = addressSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

addressSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Address", addressSchema);
