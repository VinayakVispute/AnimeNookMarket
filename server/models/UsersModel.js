const mongoose = require("mongoose");
const Address = require("./AddressModel");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required."],
  },
  password: {
    type: Buffer,
    required: [true, "Password is required."],
  },
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  role: {
    type: String,
    enum: {
      values: ["user", "admin"],
      message: 'Role must be either "user" or "admin".',
    },
    default: "user",
    required: [true, "Role is required."],
  },
  salt: {
    type: Buffer,
    required: [true, "Something Went Wrong"],
  },
});
const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
module.exports = mongoose.model("User", userSchema);
