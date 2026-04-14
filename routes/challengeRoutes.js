const express = require("express");
const router = express.Router();
const {
  createChallenge,
  getChallenges,
  getChallengeById,
  updateChallengeDay,
  updateChallenge,
  deleteChallenge,
} = require("../controllers/challengeController");

// Base CRUD
router.post("/", createChallenge);
router.get("/", getChallenges);
router.get("/:id", getChallengeById);
router.put("/:id", updateChallenge);
router.delete("/:id", deleteChallenge);

// Day-level update
router.patch("/:id/days/:dayNumber", updateChallengeDay);

module.exports = router;
