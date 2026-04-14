const Deck = require("../models/Flashcard");

// Get all decks
exports.getAllDecks = async (req, res) => {
    const decks = await Deck.find();
    res.json(decks);
};

// Get one deck
exports.getDeckById = async (req, res) => {
    const deck = await Deck.findById(req.params.id);
    res.json(deck);
};

// Create new deck
exports.createDeck = async (req, res) => {
    const { title, subject } = req.body;
    const newDeck = await Deck.create({ title, subject });
    res.json(newDeck);
};

// Add flashcard to deck
exports.addFlashcard = async (req, res) => {
    const { question, answer } = req.body;
    const deck = await Deck.findById(req.params.id);
    deck.flashcards.push({ question, answer });
    await deck.save();
    res.json(deck);
};

// Edit flashcard
exports.updateFlashcard = async (req, res) => {
    const { cardId } = req.params;
    const { question, answer } = req.body;

    const deck = await Deck.findOne({ "flashcards._id": cardId });
    const card = deck.flashcards.id(cardId);
    card.question = question;
    card.answer = answer;
    await deck.save();

    res.json(deck);
};
// Delete flashcard
exports.deleteFlashcard = async (req, res) => {
    const { cardId } = req.params;

    // Find the deck containing the card
    const deck = await Deck.findOne({ "flashcards._id": cardId });
    if (!deck) {
        return res.status(404).json({ message: "Deck not found" });
    }

    // Filter out the card to be deleted
    deck.flashcards = deck.flashcards.filter(
        (card) => card._id.toString() !== cardId
    );

    await deck.save();
    res.json({ message: "Deleted successfully" });
};

// Delete deck
exports.deleteDeck = async (req, res) => {
    await Deck.findByIdAndDelete(req.params.id);
    res.json({ message: "Deck deleted" });
};
