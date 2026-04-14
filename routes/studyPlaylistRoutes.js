const express = require("express");
const router = express.Router();
const controller = require("../controllers/studyPlaylistController");

router.post("/", controller.createVideo);
router.get("/", controller.getVideos);
router.put("/:id", controller.updateVideo);
router.delete("/:id", controller.deleteVideo);

module.exports = router;
