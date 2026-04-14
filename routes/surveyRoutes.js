const express = require("express");
const router = express.Router();
const {
  createSurvey,
  getSurveys,
  submitAnswers,
  deleteSurvey,
} = require("../controllers/surveyController");

router.post("/", createSurvey);          // Create a new survey
router.get("/", getSurveys);             // Get all surveys
router.post("/:id/submit", submitAnswers); // Submit answers to a survey
router.delete("/:id", deleteSurvey);     // Delete a survey

module.exports = router;
