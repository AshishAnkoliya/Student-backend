const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  user: { type: String }, // can be a name, email, or userId
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
