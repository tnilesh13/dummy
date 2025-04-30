const express = require("express")
const friendController = require("../controllers/friend.controller");
const router = express.Router();

router.route("/friend-request/sent").post(friendController.sendFriendRequest)
router.route("/friend-request/accept").post(friendController.acceptFriendRequest)
router.route("/friend-request/reject").post(friendController.rejectFriendRequest)

module.exports = router;