const express = require("express");
const router = express.Router();
const {
  createLink,
  getAllLinks,
  updateLink,
  deleteLink
} = require("../controllers/usefulLinksController");

router.post("/", createLink);
router.get("/", getAllLinks);
router.put("/:id", updateLink);
router.delete("/:id", deleteLink);

module.exports = router;
