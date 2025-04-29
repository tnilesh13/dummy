const express = require("express")
const friendController = require("../controllers/friend.controller");
const router = express.Router();

router.route("/sent-friend-request").post(friendController.sendFriendRequest)
router.route("/accept-friend-request").post(friendController.acceptFriendRequest)

module.exports = router;