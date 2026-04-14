const GroupProject = require("../models/groupProjectModel");

// Create
exports.createProject = async (req, res) => {
  try {
    const newProject = await GroupProject.create(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: "Failed to create project" });
  }
};

// Read All
exports.getProjects = async (req, res) => {
  try {
    const projects = await GroupProject.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// Update
exports.updateProject = async (req, res) => {
  try {
    const updated = await GroupProject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Update failed" });
  }
};

// Delete
exports.deleteProject = async (req, res) => {
  try {
    await GroupProject.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
};
