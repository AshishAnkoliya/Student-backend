const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    res.status(500).json({ message: "Error creating task", error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Task updated", task });
  } catch (err) {
    res.status(500).json({ message: "Error updating task", error: err.message });
  }
};

exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { status: "Completed" }, { new: true });
    res.status(200).json({ message: "Task completed", task });
  } catch (err) {
    res.status(500).json({ message: "Error completing task", error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err.message });
  }
};
