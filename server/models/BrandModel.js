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

module.exports = mongoose.model("Brand", brandSchema);
