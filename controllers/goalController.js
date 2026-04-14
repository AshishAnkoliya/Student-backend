const Goal = require("../models/Goal");

// Create a new goal
const createGoal = async (req, res) => {
    try {
        const { studentName, title, description, dueDate } = req.body;
        const goal = await Goal.create({
            studentName,
            title,
            description,
            dueDate,
        });
        res.status(201).json(goal);
    } catch (err) {
        res.status(500).json({ message: "Failed to create goal", error: err.message });
    }
};

// Get all goals
const getGoals = async (req, res) => {
    try {
        const goals = await Goal.find().sort({ createdAt: -1 });
        res.status(200).json(goals);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch goals", error: err.message });
    }
};

// Mark a goal as completed

// const completeGoal = async (req, res) => {
//   try {
//     const goal = await Goal.findByIdAndUpdate(
//       req.params.id,
//       { isCompleted: true },
//       { new: true }
//     );
//     if (!goal) return res.status(404).json({ message: "Goal not found" });
//     res.status(200).json(goal);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to complete goal", error: err.message });
//   }
// };

// ✅ Toggle Goal Completion
const completeGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) return res.status(404).json({ message: "Goal not found" });

        goal.isCompleted = !goal.isCompleted; // Toggle status
        await goal.save();

        res.status(200).json(goal); // Send updated goal
    } catch (err) {
        res.status(500).json({ message: "Failed to update goal", error: err.message });
    }
};


// Update goal
const updateGoal = async (req, res) => {
    try {
        const goal = await Goal.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!goal) return res.status(404).json({ message: "Goal not found" });
        res.status(200).json(goal);
    } catch (err) {
        res.status(500).json({ message: "Failed to update goal", error: err.message });
    }
};

// Delete goal
const deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findByIdAndDelete(req.params.id);
        if (!goal) return res.status(404).json({ message: "Goal not found" });
        res.status(200).json({ message: "Goal deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete goal", error: err.message });
    }
};

module.exports = {
    createGoal,
    getGoals,
    completeGoal,
    updateGoal,
    deleteGoal,
};
