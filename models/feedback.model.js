const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

});

module.exports = mongoose.model("Feedback", feedbackSchema);
