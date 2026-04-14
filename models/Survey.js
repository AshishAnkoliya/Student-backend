const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    questions: [
      {
        questionText: { type: String, required: true },
        options: [String],
        responses: [String], // store selected answers here
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Survey", surveySchema);
