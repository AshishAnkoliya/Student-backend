const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  student: String,
  staff: String,
  type: String,
  format: String,
  date: String,
  time: String,
  status: {
    type: String,
    default: "Requested"
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // ✅ NEW

});

module.exports = mongoose.model("Appointment", appointmentSchema);
