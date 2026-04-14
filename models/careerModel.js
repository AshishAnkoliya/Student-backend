const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  careerTitle: { type: String, required: true },
  field: { type: String, required: true },
  interestLevel: { type: Number, required: true },
  explorationStatus: {
    type: String,
    enum: ["Not Started", "In Progress", "Explored"],
    default: "Not Started",
  },
  targetCareerDate: { type: Date },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Career", careerSchema);
