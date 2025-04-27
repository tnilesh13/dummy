const Message = require("../models/message.model");

exports.getChatMessages = async ({ user1, user2, page, limit }) => {
  const query = {
    $or: [
      { senderId: user1, receiverId: user2 },
      { senderId: user2, receiverId: user1 },
    ],
  };

  const totalMessages = await Message.countDocuments(query);

  const messages = await Message.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit); //find all the message with which the user is associated like if he is sender or receiver

  return {
    messages: messages.reverse(),
    totalMessages,
    currentPage: page,
    totalPages: Math.ceil(totalMessages / limit),
  };
};
