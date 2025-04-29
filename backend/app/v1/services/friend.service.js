const User = require("../models/user.model");

exports.sendFriendRequest = async (senderId, receiverId) => {
  const sender = await User.findById(senderId);
  if (!sender) return { status: false, isSenderNotFound: true };

  const receiver = await User.findById(receiverId);
  if (!receiver) return { status: false, isReceiverNotFound: true };

  if (receiver.friendRequests.includes(senderId)) {
    return { status: false, isAlreadyRequested: true };
  }

  if (receiver.friendIds.includes(senderId)) {
    return { status: false, isAlreadyFriends: true };
  }

  receiver.friendRequests.push(senderId);
  await receiver.save();

  return { status: true };
};

exports.acceptFriendRequest = async (userId, senderId) => {
  const user = await User.findById(userId);
  if (!user) return { status: false, isUserNotFound: true };

  if (!user.friendRequests.includes(senderId)) {
    return { status: false, isRequestNotFound: true };
  }

  const sender = await User.findById(senderId);
  if (!sender) return { status: false, isSenderNotFound: true };

  user.friendRequests = user.friendRequests.filter(id => id.toString() !== senderId);
  user.friendIds.push(senderId);

  sender.friendIds.push(userId);

  await user.save();
  await sender.save();

  return { status: true };
};
