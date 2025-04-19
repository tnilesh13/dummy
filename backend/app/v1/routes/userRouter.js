const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
// 
router.route("/user-details").get(userController.userDetails);
router.route("/friends-list").post(userController.getFriends);
router.route("/users").post(userController.allUsers);

module.exports = router;
