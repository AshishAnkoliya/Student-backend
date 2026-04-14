const Resource = require("../models/Resource");

// Create a new resource
const createResource = async (req, res) => {
  try {
    const { title, link, category, notes, status } = req.body;
    const resource = await Resource.create({ title, link, category, notes, status });
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ message: "Failed to create resource", error: err.message });
  }
};

// Get all resources
const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch resources", error: err.message });
  }
};

// Update resource
const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resource) return res.status(404).json({ message: "Resource not found" });
    res.status(200).json(resource);
  } catch (err) {
    res.status(500).json({ message: "Failed to update resource", error: err.message });
  }
};

// Delete resource
const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });
    res.status(200).json({ message: "Resource deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete resource", error: err.message });
  }
};

module.exports = {
  createResource,
  getResources,
  updateResource,
  deleteResource,
};
