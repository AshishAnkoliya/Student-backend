const StudyPlaylist = require("../models/StudyPlaylist");

// Create
exports.createVideo = async (req, res) => {
  try {
    const newVideo = new StudyPlaylist(req.body);
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ error: "Failed to add video" });
  }
};

// Get all
exports.getVideos = async (req, res) => {
  try {
    const videos = await StudyPlaylist.find().sort({ addedAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

// Update
exports.updateVideo = async (req, res) => {
  try {
    const updated = await StudyPlaylist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update video" });
  }
};

// Delete
exports.deleteVideo = async (req, res) => {
  try {
    await StudyPlaylist.findByIdAndDelete(req.params.id);
    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete video" });
  }
};
