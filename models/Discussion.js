const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    user: String,
    text: String,
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const discussionSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    replies: [replySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discussion", discussionSchema);
