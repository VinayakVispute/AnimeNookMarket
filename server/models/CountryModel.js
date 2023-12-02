const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

// Pre-save hook to automatically generate 'value' from 'label'
countrySchema.pre("save", function (next) {
  this.value = this.label.toLowerCase().replace(/\s+/g, "-");
  next();
});

const virtual = countrySchema.virtual("id");
virtual.get(function () {
  return this._id;
});

countrySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Country", countrySchema);
