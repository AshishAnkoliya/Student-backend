const Habit = require("../models/Habit");

exports.createHabit = async (req, res) => {
    try {
        const habit = await Habit.create(req.body);
        res.status(201).json(habit);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getHabits = async (req, res) => {
    try {
        const habits = await Habit.find();
        res.json(habits);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateHabit = async (req, res) => {
    try {
        const updated = await Habit.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.markHabit = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, completed } = req.body;

        const habit = await Habit.findById(id);
        const existing = habit.progress.find(p => new Date(p.date).toDateString() === new Date(date).toDateString());

        if (existing) {
            existing.completed = completed;
        } else {
            habit.progress.push({ date, completed });
        }

        await habit.save();
        res.json(habit);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteHabit = async (req, res) => {
    try {
        await Habit.findByIdAndDelete(req.params.id);
        res.json({ message: "Habit deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
