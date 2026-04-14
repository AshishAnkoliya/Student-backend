const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  completeTask,
  deleteTask,
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.put("/:id/complete", completeTask);
router.delete("/:id", deleteTask);

module.exports = router;
