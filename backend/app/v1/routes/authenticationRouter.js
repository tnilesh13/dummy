const express = require("express");
const userRoutes = require("./userRouter");
const contactRoutes = require("./contactRouter");
// const chatRoutes = require("./chatRouter");
const validateTokenHandler = require("../middleware/validateTokenHandler")

const router = express.Router();

// router.use(passport.authenticate('jwt', {session: false}))
router.use(validateTokenHandler);
router.use("/user", userRoutes);
router.use("/contacts", contactRoutes);
// router.use("/chats", chatRoutes);

module.exports = router;
