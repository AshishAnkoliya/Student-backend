const express = require("express");
const router = express.Router();
const {
  submitSuggestion,
  getSuggestions,
} = require("../controllers/suggestionController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.post("/", submitSuggestion);
// router.get("/",getSuggestions); // protect with admin check if needed

router.get("/", protect, isAdmin, getSuggestions);

module.exports = router;
