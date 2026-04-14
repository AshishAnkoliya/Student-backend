const Attendance = require("../models/attendanceModel");

// Create or update attendance
exports.markAttendance = async (req, res) => {
  const { studentName, date, status } = req.body;

  try {
    const updated = await Attendance.findOneAndUpdate(
      { studentName, date },
      { status },
      { upsert: true, new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to mark attendance" });
  }
};

// Get all attendance records
exports.getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().sort({ date: -1 });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch records" });
  }
};
