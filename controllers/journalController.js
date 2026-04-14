const Journal = require("../models/Journal");

// Create
const createJournal = async (req, res) => {
  try {
    const newJournal = await Journal.create(req.body);
    res.status(201).json(newJournal);
  } catch (err) {
    res.status(500).json({ message: "Failed to create journal", error: err.message });
  }
};

// Get All
const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find().sort({ createdAt: -1 });
    res.status(200).json(journals);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch journals", error: err.message });
  }
};

// Update
const updateJournal = async (req, res) => {
  try {
    const journal = await Journal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!journal) return res.status(404).json({ message: "Journal not found" });
    res.status(200).json(journal);
  } catch (err) {
    res.status(500).json({ message: "Failed to update journal", error: err.message });
  }
};

// Delete
const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findByIdAndDelete(req.params.id);
    if (!journal) return res.status(404).json({ message: "Journal not found" });
    res.status(200).json({ message: "Journal deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete journal", error: err.message });
  }
};

module.exports = {
  createJournal,
  getJournals,
  updateJournal,
  deleteJournal,
};
