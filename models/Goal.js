const mongoose = require("mongoose");

// Goal schema defines the structure of a student's goal document in MongoDB
const goalSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true }, // name of the student
    title: { type: String, required: true },       // goal title
    description: { type: String },                 // optional details
    dueDate: { type: Date },                       // optional due date
    isCompleted: { type: Boolean, default: false },// completion status
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
