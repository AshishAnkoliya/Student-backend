const express = require("express");
const router = express.Router();
const {
  createCareer,
  getAllCareers,
  updateCareer,
  deleteCareer,
} = require("../controllers/careerController");

router.post("/", createCareer);
router.get("/", getAllCareers);
router.put("/:id", updateCareer);
router.delete("/:id", deleteCareer);

module.exports = router;
