const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const deckSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: String,
  createdAt: { type: Date, default: Date.now },
  flashcards: [flashcardSchema],
});

module.exports = mongoose.model("Deck", deckSchema);
