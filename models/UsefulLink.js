const mongoose = require("mongoose");

const UsefulLinkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Frontend, Backend, Tools
  notes: { type: String },
  status: { type: String, enum: ["To Read", "Read"], default: "To Read" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UsefulLink", UsefulLinkSchema);
