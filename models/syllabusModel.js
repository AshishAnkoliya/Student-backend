const mongoose = require("mongoose");

const syllabusSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      default: "Not Started",
    },
    progress: {
      type: Number,
      default: 0,
    },
    targetDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Syllabus", syllabusSchema);
