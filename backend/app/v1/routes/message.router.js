const express = require("express")
const messageController = require("../controllers/message.controller")
const router = express.Router();

router.route("/:id").get(messageController.getMessages)
// router.post("/send/:id", protectedRoute, sendMessage);

module.exports = router;
