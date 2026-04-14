const express = require("express");
const router = express.Router();
const {
  createGoal,
  getGoals,
  completeGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

// Routes for goals
router.post("/", createGoal); // Create a goal
router.get("/", getGoals); // Get all goals
router.put("/:id/complete", completeGoal); // Mark as completed
router.put("/:id", updateGoal); // Update goal
router.delete("/:id", deleteGoal); // Delete goal

module.exports = router;
