const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  date: { type: String, required: true }, // Format: 'YYYY-MM-DD'
  status: { type: String, enum: ['Present', 'Absent'], required: true }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
