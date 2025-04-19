// const express = require("express");
// const http = require("http");
// const router = express.Router();
// const { handleChatConnection } = require("../controllers/chatController"); //getChats
// const socketIo = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);
// // router.route("/").get(getChats);

// // Serve the chat page (HTML or UI, if you want to provide one)
// router.get("/chat", (req, res) => {
//   res.send("Socket.IO Chat Room. Connect and start chatting here.");
// });

// // Serve the home page
// router.get("/", (req, res) => {
//   res.send("Welcome to the chat application! Go to /chat to use the chat.");
// });

// // Socket.IO namespace setup for chat
// const chatNamespace = io.of("/chat");
// chatNamespace.on("connection", handleChatConnection);

// module.exports = router;
