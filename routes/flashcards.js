const express = require("express");
const router = express.Router();
const controller = require("../controllers/flashcardController");

router.get("/decks", controller.getAllDecks);
router.get("/decks/:id", controller.getDeckById);
router.post("/decks", controller.createDeck);
router.delete("/decks/:id", controller.deleteDeck);

router.post("/decks/:id/cards", controller.addFlashcard);
router.put("/cards/:cardId", controller.updateFlashcard);
router.delete("/cards/:cardId", controller.deleteFlashcard);

module.exports = router;
