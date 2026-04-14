const Suggestion = require("../models/Suggestion");

// Submit suggestion
exports.submitSuggestion = async (req, res) => {
  const { message, category } = req.body;
  const suggestion = new Suggestion({ message, category });
  await suggestion.save();
  res.json({ message: "Thank you for your feedback!" });
};

// View all suggestions (for admin)
exports.getSuggestions = async (req, res) => {
  const suggestions = await Suggestion.find().sort({ createdAt: -1 });
  res.json(suggestions);
  console.log("Received Headers:", req.headers);
};
