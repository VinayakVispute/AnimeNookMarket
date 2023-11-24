const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, "Label is required."],
  },
  value: {
    type: String,
  },
});

// Pre-save hook to automatically generate 'value' from 'label'
brandSchema.pre("save", function (next) {
  this.value = this.label.toLowerCase().replace(/\s+/g, "-");
  next();
});
const virtual = brandSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

brandSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Brand", brandSchema);
