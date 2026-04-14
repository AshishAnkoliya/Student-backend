const express = require("express");
const router = express.Router();
const {
  createDiscussion,
  getAllDiscussions,
  addReply,
  deleteDiscussion,
} = require("../controllers/discussionController");

router.post("/", createDiscussion);        // Create post
router.get("/", getAllDiscussions);        // Get all posts
router.post("/:id/reply", addReply);       // Add a reply to a post
router.delete("/:id", deleteDiscussion);   // Delete a post

module.exports = router;
