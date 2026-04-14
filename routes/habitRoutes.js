const express = require("express");
const router = express.Router();
const {
  createHabit,
  getHabits,
  markHabit,
  deleteHabit,
  updateHabit,
} = require("../controllers/habitController");

router.post("/", createHabit);
router.get("/", getHabits);
router.patch("/:id/mark", markHabit);
router.delete("/:id", deleteHabit);
router.put("/:id", updateHabit);

module.exports = router;
