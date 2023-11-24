const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, "Label is required."],
  },
  value: {
    type: String,
  },
});

// Pre-save hook to automatically generate 'value' from 'label'
categorySchema.pre("save", function (next) {
  this.value = this.label.toLowerCase().replace(/\s+/g, "-");
  console.log("pre save hook category model");
  next();
});
const virtual = categorySchema.virtual("id");
virtual.get(function () {
  return this._id;
});

categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
module.exports = mongoose.model("Category", categorySchema);
