const Career = require("../models/careerModel");

exports.createCareer = async (req, res) => {
  try {
    const career = new Career(req.body);
    await career.save();
    res.status(201).json(career);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllCareers = async (req, res) => {
  try {
    const careers = await Career.find().sort({ createdAt: -1 });
    res.json(careers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch careers" });
  }
};

exports.updateCareer = async (req, res) => {
  try {
    const updated = await Career.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCareer = async (req, res) => {
  try {
    await Career.findByIdAndDelete(req.params.id);
    res.json({ message: "Career deleted" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
};
