const mongoose = require("mongoose");

const groupProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    members: [{ type: String }], // could be student names or IDs
    notes: { type: String },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      default: "Not Started",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GroupProject", groupProjectSchema);
