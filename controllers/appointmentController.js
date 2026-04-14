const Appointment = require("../models/Appointment");

exports.getAppointments = async (req, res) => {
  try {
    const { search } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { student: { $regex: search, $options: "i" } },
        { staff: { $regex: search, $options: "i" } },
      ];
    }
    const appointments = await Appointment.find(query).sort({ date: -1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Update Appointment by ID
exports.updateAppointment = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(updated);
  } catch (err) {
    console.error("Error updating appointment:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Delete Appointment by ID
exports.deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    console.error("Error deleting appointment:", err);
    res.status(500).json({ error: "Server error" });
  }
};