const express = require("express");
const userRoutes = require("./user.router");
const contactRoutes = require("./contact.router");
const messageRoutes = require("./message.router");
const authMiddleware = require("../middleware/auth.middleware.js")

const router = express.Router();

// router.use(passport.authenticate('jwt', {session: false}))
router.use(authMiddleware);
router.use("/user", userRoutes);
router.use("/contacts", contactRoutes);
router.use("/messages", messageRoutes)

module.exports = router;
