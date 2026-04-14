const Note = require("../models/Note");

// Create Note
const createNote = async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: "Failed to create note", error: err.message });
  }
};

// Get All Notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes", error: err.message });
  }
};

// Update Note
const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};

// Delete Note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err.message });
  }
};

const togglePin = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    note.isPinned = !note.isPinned;
    await note.save();
    res.json({ message: "Note pin status updated", note });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Export all at the bottom
module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  togglePin,
};
