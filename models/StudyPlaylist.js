const mongoose = require("mongoose");

const StudyPlaylistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
  },
  description: String,
  subject: String,
  tags: [String],
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StudyPlaylist", StudyPlaylistSchema);
