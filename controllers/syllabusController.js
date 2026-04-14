const Syllabus = require("../models/syllabusModel");

// Create
exports.createSyllabus = async (req, res) => {
    try {
        const { studentName, subject, topic, status, progress, targetDate, notes } = req.body;

        if (!studentName || !subject || !topic || !status || !targetDate) {
            return res.status(400).json({ error: "Please fill all required fields" });
        }

        const newSyllabus = new Syllabus({
            studentName,
            subject,
            topic,
            status,
            progress,
            targetDate,
            notes,
        });

        const saved = await newSyllabus.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Read All
exports.getAllSyllabus = async (req, res) => {
    try {
        const syllabusList = await Syllabus.find().sort({ createdAt: -1 });
        res.json(syllabusList);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch syllabus" });
    }
};

// Update
exports.updateSyllabus = async (req, res) => {
    try {
        const updated = await Syllabus.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: "Update failed" });
    }
};

// Delete
exports.deleteSyllabus = async (req, res) => {
    try {
        await Syllabus.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Delete failed" });
    }
};
