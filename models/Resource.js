const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
    category: { type: String, required: true }, // e.g., "Video", "Article", "PDF"
    notes: { type: String },
    status: { type: String, enum: ["To Read", "Read"], default: "To Read" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);
