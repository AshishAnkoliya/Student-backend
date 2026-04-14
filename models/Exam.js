const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  examDate: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // e.g., "10:00 AM - 12:00 PM"
    required: true,
  },
  location: {
    type: String,
    default: "Online", // or physical room
  },
  description: {
    type: String,
    default: "",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Exam", examSchema);
