const Feedback = require("../models/feedback.model");

const submitFeedback = async (req, res) => {
    try {
        const { appointmentId, studentName, rating, comment } = req.body;

        if (!appointmentId || !studentName || !rating || !comment) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existing = await Feedback.findOne({ appointmentId, studentName });
        if (existing) {
            return res.status(400).json({ message: "Feedback already submitted." });
        }

        // Log incoming data
        console.log("Incoming feedback:", req.body);

        const feedback = new Feedback({ appointmentId, studentName, rating, comment });
        await feedback.save();

        res.status(201).json({ message: "Feedback submitted", feedback });
    } catch (err) {
        console.error("❌ Error in submitFeedback:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find()
            .populate("appointmentId", "date staff type format")
            .sort({ createdAt: -1 }); // optional: latest first

        res.status(200).json(feedbacks);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


module.exports = {
    submitFeedback,
    getAllFeedbacks,
};
