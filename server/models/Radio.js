const mongoose = require("mongoose");

const RadioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  streamUrl: { type: String, required: true },
  description: { type: String },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Radio", RadioSchema);
