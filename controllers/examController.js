const Exam = require("../models/Exam");

// Create new exam
exports.createExam = async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all exams
exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().sort({ examDate: 1 });
    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update exam
exports.updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete exam
exports.deleteExam = async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);
    res.json({ message: "Exam deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
