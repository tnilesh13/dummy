const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.route("/user-details").get(userController.userDetails);
router.route("/friends-list").post(userController.getFriends);
router.route("/users").post(userController.allUsers);

router.route("/update-profile").put(userController.updateProfile);
router.route("/check").get(userController.checkAuth);

router.route("/users/sidebar").get(userController.getUsersForSidebar)

module.exports = router;
