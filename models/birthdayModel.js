const mongoose = require("mongoose");

const birthdaySchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Birthday", birthdaySchema);
