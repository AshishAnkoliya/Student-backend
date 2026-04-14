const Progress = require("../models/Progress");

// Create new progress record
exports.createProgress = async (req, res) => {
  try {
    const progress = new Progress(req.body);
    await progress.save();
    res.status(201).json(progress);
  } catch (err) {
    res.status(500).json({ message: "Error creating progress", error: err });
  }
};

// Get all progress records
exports.getAllProgress = async (req, res) => {
  try {
    const records = await Progress.find().sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching progress", error: err });
  }
};

// Update a progress record
exports.updateProgress = async (req, res) => {
  try {
    const updated = await Progress.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating progress", error: err });
  }
};

// Delete a progress record
exports.deleteProgress = async (req, res) => {
  try {
    await Progress.findByIdAndDelete(req.params.id);
    res.json({ message: "Progress deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting progress", error: err });
  }
};
