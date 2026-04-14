const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  dueDate: { type: Date, required: true },
  submitted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
