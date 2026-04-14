const UsefulLink = require("../models/UsefulLink");

// Create a new link
exports.createLink = async (req, res) => {
  try {
    const newLink = new UsefulLink(req.body);
    await newLink.save();
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all links
exports.getAllLinks = async (req, res) => {
  try {
    const links = await UsefulLink.find().sort({ createdAt: -1 });
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a link
exports.updateLink = async (req, res) => {
  try {
    const updated = await UsefulLink.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a link
exports.deleteLink = async (req, res) => {
  try {
    await UsefulLink.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
