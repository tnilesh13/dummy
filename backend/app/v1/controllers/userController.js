const asyncHandler = require("express-async-handler");
const { errorMessage, statusCode, successMessage } = require("../constants/constants");
const User = require("../models/userModel");
const { sendResponse } = require("../utils/sendResponseUtils");
const { jwtDecode } = require("jwt-decode");
const service = require("../services/UserService")
const chatService = require("../services/chatService")

// exports.sendFriendRequest = async (senderId, receiverId) => {
//     const receiver = await User.findById(receiverId);
//     if (!receiver) return { status: false, message: "User not found" };

//     if (receiver.friendRequests.includes(senderId))
//         return { status: false, message: "Request already sent" };

//     receiver.friendRequests.push(senderId);
//     await receiver.save();

//     return { status: true, message: "Friend request sent" };
// };

// exports.acceptFriendRequest = async (userId, senderId) => {
//     const user = await User.findById(userId);
//     if (!user) return { status: false, message: "User not found" };

//     user.friendRequests = user.friendRequests.filter(id => id.toString() !== senderId);
//     user.friendIds.push(senderId);

//     const sender = await User.findById(senderId);
//     sender.friendIds.push(userId);

//     await user.save();
//     await sender.save();

//     return { status: true, message: "Friend request accepted" };
// };

exports.userDetails = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const decoded = jwtDecode(token);
    const userDetail = await User.findOne(
      { _id: decoded.id },
      { salt: 0, password: 0 }
    );
    return sendResponse(
      res,
      statusCode.OK,
      true,
      `User Details ${successMessage.FETCH}`,
      userDetail
    );
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      statusCode.INTERNAL_SERVER_ERROR,
      false,
      errorMessage.INTERNAL_SERVER_ERROR
    );
  }
};

exports.getFriends = asyncHandler(async (req, res) => {
  console.log("---------get Friends", req.userId);
  
  const result = await service.getFriends(req.userId, req.body);
  return sendResponse(
    res,
    statusCode.OK,
    true,
    `User Details ${successMessage.FETCH}`,
    result
  );
})

exports.allUsers = async (req, res) => {
  try {
      let query = req.body.query
      let details = req.body
      console.log(query)
      const result = await service.allUsers(query, details)
      return sendResponse(res, statusCode.OK, true, `All Users ${successMessage.FETCH}`, result)
  } catch (error) {
      console.log(error)
      return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, errorMessage.INTERNAL_SERVER_ERROR)
  }
}
