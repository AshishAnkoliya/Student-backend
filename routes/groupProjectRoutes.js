const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/groupProjectController");

router.get("/", getProjects);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
