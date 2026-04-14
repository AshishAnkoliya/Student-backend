const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    entry: { type: String, required: true },
    mood: { type: String, enum: ["Happy", "Neutral", "Sad"], default: "Neutral" },
    tags: [String],
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journal", journalSchema);
