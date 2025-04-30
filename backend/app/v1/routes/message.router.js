const express = require("express")
const messageController = require("../controllers/message.controller")
const adminMiddleware = require("../middleware/admin.middleware")
const router = express.Router();

router.route("/:id").get(messageController.getMessages)
// router.post("/send/:id", protectedRoute, sendMessage);

router.route("/delete/chat-with-user").post(adminMiddleware, messageController.deleteChatWithUser);
router.route("/delete/all-chats").delete(adminMiddleware, messageController.deleteAllChats);

module.exports = router;
