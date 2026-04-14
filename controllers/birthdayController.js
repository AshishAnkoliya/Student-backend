const Birthday = require("../models/birthdayModel");

// ➕ Create
exports.createBirthday = async (req, res) => {
  try {
    const { studentName, birthDate, notes } = req.body;
    const birthday = await Birthday.create({ studentName, birthDate, notes });
    res.json(birthday);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📄 Get all
exports.getAllBirthdays = async (req, res) => {
  try {
    const birthdays = await Birthday.find().sort({ birthDate: 1 });
    res.json(birthdays);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📝 Update
exports.updateBirthday = async (req, res) => {
  try {
    const updated = await Birthday.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ❌ Delete
exports.deleteBirthday = async (req, res) => {
  try {
    await Birthday.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
