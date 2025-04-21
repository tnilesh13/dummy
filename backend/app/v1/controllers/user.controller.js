const asyncHandler = require("express-async-handler");
const { jwtDecode } = require("jwt-decode");
const User = require("../models/user.model");
const service = require("../services/user.service");
const { sendResponse } = require("../utils/sendResponse.utils");
const { statusCode, successMessage, errorMessage } = require("../constants/constants");

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

// Get current user details
exports.userDetails = asyncHandler(async (req, res) => {
  const token = req.headers["authorization"];
  const decoded = jwtDecode(token);

  const userDetail = await User.findById(decoded.id).select("-password -salt");

  return sendResponse(res, statusCode.OK, true, `User Details ${successMessage.FETCHED}`, userDetail);
});

// Get friend list (with filter + pagination)
exports.getFriends = asyncHandler(async (req, res) => {
  const result = await service.getFriends(req.userId, req.body);
  return sendResponse(res, statusCode.OK, true, `Friend list ${successMessage.FETCHED}`, result);
});

// Search all users (with filter + pagination)
exports.allUsers = asyncHandler(async (req, res) => {
  const result = await service.allUsers(req.body.query, req.body);
  return sendResponse(res, statusCode.OK, true, `All Users ${successMessage.FETCHED}`, result);
});

// Update profile picture
exports.updateProfile = asyncHandler(async (req, res) => {
  const { profilePic } = req.body;
  const userId = req.user._id;

  if (!profilePic) {
    return sendResponse(res, statusCode.BAD_REQUEST, false, "Profile pic is required");
  }

  const updatedUser = await service.updateUserProfile(userId, profilePic);
  return sendResponse(res, statusCode.OK, true, successMessage.UPDATE_PROFILE, updatedUser);
});

// Auth Check
exports.checkAuth = asyncHandler(async (req, res) => {
  return sendResponse(res, statusCode.OK, true, "Authenticated", req.user);
});

exports.getUsersForSidebar = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;
  const users = await userService.getAllExcept(loggedInUserId);
  return sendResponse(res, statusCode.OK, true, `Users ${successMessage.FETCHED}`, users);
});
