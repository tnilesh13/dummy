const express = require("express");
const userController = require("../controllers/user.controller");
const adminMiddleware = require("../middleware/admin.middleware")
const router = express.Router();

router.route("/user-details").get(userController.userDetails);
router.route("/friends-list").post(userController.getFriends);
router.route("/users").post(userController.allUsers);

router.route("/update-profile").put(userController.updateProfile);
router.route("/check").get(userController.checkAuth);

router.route("/users/sidebar").get(userController.getUsersForSidebar)

router.route("/delete/:userId").delete(adminMiddleware, userController.deleteUserById);

module.exports = router;
