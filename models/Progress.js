const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  studentName: { type: String, required: true }, // or use userId if authentication
  subject: { type: String, required: true },
  examName: { type: String, required: true },
  score: { type: Number, required: true },
  totalMarks: { type: Number, default: 100 },
  notes: String,
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Progress", progressSchema);
    