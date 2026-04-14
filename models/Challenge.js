const mongoose = require("mongoose");

const ChallengeDaySchema = new mongoose.Schema(
  {
    dayNumber: { type: Number, required: true }, // 1–duration
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pending", "Done", "Missed", "Skipped"],
      default: "Pending",
    },
    notes: { type: String },
    proofUrl: { type: String },
  },
  { _id: false } // no separate _id for each day entry
);

const ChallengeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    durationDays: { type: Number, default: 30 },
    days: [ChallengeDaySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Challenge", ChallengeSchema);
