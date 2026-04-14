const Assignment = require("../models/Assignment");

// Create assignment
exports.createAssignment = async (req, res) => {
  const assignment = new Assignment(req.body);
  await assignment.save();
  res.json(assignment);
};

// Get all
exports.getAssignments = async (req, res) => {
  const assignments = await Assignment.find().sort({ dueDate: 1 });
  res.json(assignments);
};

// Update
exports.updateAssignment = async (req, res) => {
  const updated = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete
exports.deleteAssignment = async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
