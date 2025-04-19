const Chat = require("../models/chatModel");
const chatService = require("../services/chatService");
// const supportChatService = require("../services/supportChatSocketService");

function setupSocket(server) {
  const io = require("socket.io")(server);
  let id = {};
  io.on("connection", (socket) => {
    console.log("User connected", socket.id, "------------");

    socket.on("join", (room) => {
      // Join the specified room
      console.log("########################Join Room#######################");
      socket.join(room);
    });

    socket.on("joinChat", async ({ sender, receiver }) => {
      const chatRoom = [sender, receiver].sort().join("_"); // Unique room name
      socket.join(chatRoom);
      console.log(`${sender} and ${receiver} joined room ${chatRoom}`);
  
      const history = await chatService.getCurrentSenderAndReceiverHistory(sender, receiver);
      io.to(chatRoom).emit("currentHistory", history);
    });  

    socket.on("connected", (room) => {
      // Join the specified room
      console.log("########################Join Room#######################");
      console.log(room, "room details-------");
      console.log(socket.id, "room details-------");
      // console.log(socket.,"details-------")
      id[room] = socket.id;
    });

    //  get current sender and receiver history
    socket.on("currentHistory", async (messagePost) => {
      console.log(
        messagePost,
        "########################Message Post#######################"
      );
      if (messagePost.sender && messagePost.receiver) {
        const history = await chatService.getCurrentSenderAndReceiverHistory(
          messagePost.sender,
          messagePost.receiver
        );
        io.to(messagePost.room).emit("currentHistory", history);
      }
    });

    // get users list
    socket.on("usersList", async (loginUser) => {
      console.log("login user id", loginUser);
      const usersList = await chatService.getUsersList(loginUser.id);
      io.to(loginUser.room).emit("usersList", usersList);
    });

    // add new message
    socket.on("addNewMessage", async (messageDetails) => {
      const chatRoom = [messageDetails.sender, messageDetails.receiver].sort().join("_");
      
      const newMessage = {
          sender: messageDetails.sender,
          text: messageDetails.text,
          createdAt: new Date(),
      };
  
      let chat = await Chat.findOne({ room: chatRoom });
      if (!chat) {
          chat = await Chat.create({ room: chatRoom, messages: [newMessage] });
      } else {
          chat.messages.push(newMessage);
          await chat.save();
      }
  
      io.to(chatRoom).emit("addNewMessage", newMessage);
    });

    // update message
    socket.on("updateMessage", async (messageDetails) => {
      console.log(
        messageDetails,
        "########################Update Message#######################"
      );
      const result = await chatService.updateChat(messageDetails);
      io.to(messageDetails.room).emit("updateMessage", result);
    });

    // delete message
    socket.on("deleteMessage", async (messageDetails) => {
      console.log(
        messageDetails,
        "########################Delete Message#######################"
      );
      const result = await chatService.deleteChat(messageDetails);
      io.to(messageDetails.room).emit("deleteMessage", result);
    });

    // delete message
    socket.on("searchMessage", async (messageDetails) => {
      console.log(
        messageDetails,
        "########################Search Message#######################"
      );
      const result = await chatService.search(messageDetails);
      io.to(messageDetails.room).emit("searchMessage", result);
    });

    //support  socket

    //  get current sender and receiver history
    socket.on("supportCurrentHistory", async (messagePost) => {
      console.log(
        messagePost,
        "########################Support Message Post#######################"
      );
      if (messagePost.sender) {
        console.log("condiiton hit");
        const history =
          await supportChatService.getCurrentSenderAndReceiverHistory(
            messagePost.sender,
            messagePost.receiver
          );
        console.log(history, "history--");
        console.log(id[messagePost.room], "history--");

        io.to(id[messagePost.room]).emit("supportCurrentHistory", history);
      }
    });

    // get users list
    socket.on("supportUsersList", async () => {
      console.log("i hit.--- user list");
      const usersList = await supportChatService.getUsersList();
      console.log(usersList, "lllllllllllllllllllllllllll");
      io.emit("supportUsersList", usersList);
    });

    // add new message
    socket.on("supportAddNewMessage", async (messageDetails) => {
      console.log(
        messageDetails,
        "########################Support New Message#######################"
      );
      const result = await supportChatService.addChat(messageDetails);
      io.to(id[messageDetails.room]).emit("supportAddNewMessage", result);
      io.to(id[messageDetails.sender]).emit("supportAddNewMessage", result);
    });

    // update message
    socket.on("supportUpdateMessage", async (messageDetails) => {
      console.log(
        messageDetails,
        "########################Support Update Message#######################"
      );
      const result = await supportChatService.updateChat(messageDetails);
      io.to(id[messageDetails.room]).emit("supportUpdateMessage", result);
      io.to(id[messageDetails.userId]).emit("supportUpdateMessage", result);
    });

    // delete message
    socket.on("supportDeleteMessage", async (messageDetails) => {
      console.log(
        messageDetails,
        "########################Support Delete Message#######################"
      );
      const result = await supportChatService.deleteChat(messageDetails);
      io.to(id[messageDetails.room]).emit("supportDeleteMessage", result);
      io.to(id[messageDetails.userId]).emit("supportDeleteMessage", result);
    });

    // search message
    socket.on("supportSearchMessage", async (messageDetails) => {
      console.log(
        messageDetails,
        "########################Support Search Message#######################"
      );
      const result = await supportChatService.search(messageDetails);
      io.to(id[messageDetails.room]).emit("supportSearchMessage", result);
    });

    // disconnect socket
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  io.on("error", (error) => {
    console.error("Socket.IO server error:", error);
  });
  return io;
}

module.exports = { setupSocket };
