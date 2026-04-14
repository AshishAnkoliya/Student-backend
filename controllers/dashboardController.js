const Appointment = require("../models/Appointment");
const Task = require("../models/Task");
const Feedback = require("../models/feedback.model");
const Goal = require("../models/Goal"); // ✅ Import Goal model
const Resource = require("../models/Resource"); // ✅ Import Resource model

const getDashboardSummary = async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments(); 
    const pendingTasks = await Task.countDocuments({ status: "Pending" });
    const completedTasks = await Task.countDocuments({ status: "Completed" });

    const feedbacks = await Feedback.find();
    const averageRating =
      feedbacks.length === 0
        ? "0.0"
        : (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1);

    // ✅ New metrics
    const totalGoals = await Goal.countDocuments();
    const completedGoals = await Goal.countDocuments({ isCompleted: true });

    const totalResources = await Resource.countDocuments();
    const readResources = await Resource.countDocuments({ status: "Read" });
    const toReadResources = await Resource.countDocuments({ status: "To Read" });

    res.json({
      totalAppointments,
      pendingTasks,
      completedTasks,
      averageRating,
      totalGoals,
      completedGoals,
      totalResources,
      readResources,
      toReadResources,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Failed to load dashboard" });
  }
};

module.exports = { getDashboardSummary };
