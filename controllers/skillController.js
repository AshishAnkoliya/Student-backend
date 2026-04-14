const Skill = require("../models/Skill");

// Create new skill
const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ message: "Failed to create skill", error: err.message });
  }
};

// Get all skills
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.status(200).json(skills);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch skills", error: err.message });
  }
};

// Update skill progress / info
const updateSkill = async (req, res) => {
  try {
    const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Skill not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update skill", error: err.message });
  }
};

// Delete skill
const deleteSkill = async (req, res) => {
  try {
    const deleted = await Skill.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Skill not found" });
    res.status(200).json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete skill", error: err.message });
  }
};

module.exports = {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill,
};
