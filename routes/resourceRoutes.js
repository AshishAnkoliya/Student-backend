const express = require("express");
const router = express.Router();
const {
  createResource,
  getResources,
  updateResource,
  deleteResource,
} = require("../controllers/resourceController");

router.post("/", createResource);          // Add new resource
router.get("/", getResources);             // List all resources
router.put("/:id", updateResource);        // Update resource
router.delete("/:id", deleteResource);     // Delete resource

module.exports = router;
