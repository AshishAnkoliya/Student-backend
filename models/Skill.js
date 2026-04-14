const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    progress: { type: Number, default: 0 }, // 0 to 100
    completed: { type: Boolean, default: false },
    notes: { type: String },
    resourceLinks: [String], // optional URLs
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
