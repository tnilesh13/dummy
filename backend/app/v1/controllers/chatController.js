// let messages = []; // Store messages in memory

// // Handle socket connections and chat functionality
// function handleChatConnection(socket) {
//   console.log("New user connected to /chat:", socket.id);

//   // Emit previous messages to the new user
//   socket.emit("loadMessages", messages);

//   // Listen for new messages from the client
//   socket.on("sendMessage", (message) => {
//     console.log("Message received:", message);

//     // Save the message in memory (for simplicity)
//     messages.push(message);

//     // Emit the new message to all connected clients on the /chat namespace
//     io.of("/chat").emit("newMessage", message);
//   });

//   // Listen for user disconnects
//   socket.on("disconnect", () => {
//     console.log("User disconnected from /chat", socket.id);
//   });
// }

// module.exports = { handleChatConnection };