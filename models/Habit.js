const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String, default: "🔥" }, // Optional emoji
  frequency: { type: String, default: "daily" }, // or "weekly", "custom"
  progress: [
    {
      date: { type: Date },
      completed: { type: Boolean, default: false }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Habit", habitSchema);
