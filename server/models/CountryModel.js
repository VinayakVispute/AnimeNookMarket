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
const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
