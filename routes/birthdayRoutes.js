const express = require("express");
const router = express.Router();
const birthdayController = require("../controllers/birthdayController");

router.get("/", birthdayController.getAllBirthdays);
router.post("/", birthdayController.createBirthday);
router.put("/:id", birthdayController.updateBirthday);
router.delete("/:id", birthdayController.deleteBirthday);

module.exports = router;
