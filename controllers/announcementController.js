const Announcement = require("../models/announcementModel");

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;
    if (!title || !message) {
      return res.status(400).json({ error: "Please fill all fields" });
    }
    const newAnn = await Announcement.create({ title, message });
    res.status(201).json(newAnn);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const data = await Announcement.find().sort({ date: -1 });
    res.json(data);
  } catch {
    res.status(500).json({ error: "Error fetching announcements" });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
};
