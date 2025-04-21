const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cloudinary = require("../config/cloudinary.js");
const Message = require("../models/message.model.js");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5174"],
    credentials: true,
  },
});

// used to store online users
const userSocketMap = {}; // {userId: socketId}

// export function getReceiverSocketId(userId) {
//   return userSocketMap[userId];
// }

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("joinChat", ({ senderId, receiverId }) => {
    const chatRoom = [senderId, receiverId].sort().join("_");
    socket.join(chatRoom);
  });

  socket.on("addNewMessage", async ({ senderId, receiverId, text, image }) => {
    try {
      let imageUrl;
      if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }

      const newMessage = await Message.create({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });

      const chatRoom = [senderId, receiverId].sort().join("_");
      io.to(chatRoom).emit("addNewMessage", newMessage);
    } catch (error) {
      console.error("Socket Error: addNewMessage", error.message);
    }
  });

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { app, server, io };
