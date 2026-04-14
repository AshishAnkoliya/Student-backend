const Discussion = require("../models/Discussion");

// Create a new discussion post
const createDiscussion = async (req, res) => {
  try {
    const { user, title, description } = req.body;
    const post = await Discussion.create({ user, title, description });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to create post", error: err.message });
  }
};

// Get all discussions
const getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().sort({ createdAt: -1 });
    res.status(200).json(discussions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch discussions", error: err.message });
  }
};

// Add a reply to a discussion
const addReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, text } = req.body;

    const discussion = await Discussion.findById(id);
    if (!discussion) return res.status(404).json({ message: "Discussion not found" });

    discussion.replies.push({ user, text });
    await discussion.save();

    res.status(200).json(discussion);
  } catch (err) {
    res.status(500).json({ message: "Failed to add reply", error: err.message });
  }
};

// Delete a discussion
const deleteDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Discussion.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Discussion not found" });

    res.status(200).json({ message: "Discussion deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete discussion", error: err.message });
  }
};

module.exports = {
  createDiscussion,
  getAllDiscussions,
  addReply,
  deleteDiscussion,
};
