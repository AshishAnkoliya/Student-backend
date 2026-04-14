const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
  message: { type: String, required: true },
  category: { type: String, default: "General" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Suggestion", suggestionSchema);
