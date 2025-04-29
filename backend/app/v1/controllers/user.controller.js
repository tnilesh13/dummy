const asyncHandler = require("express-async-handler");
const { jwtDecode } = require("jwt-decode");
const User = require("../models/user.model");
const service = require("../services/user.service");
const { sendResponse } = require("../utils/sendResponse.utils");
const { statusCode, successMessage, errorMessage } = require("../constants/constants");

// Get current user details
exports.userDetails = asyncHandler(async (req, res) => {
  const userDetail = await User.findById(req.userId).populate({
    path: "friendRequests",
    select: "fullName profilePic"
  }).select("-password -salt");

  return sendResponse(res, statusCode.OK, true, `User Details ${successMessage.FETCHED}`, userDetail);
});

// Get friend list (with filter + pagination)
exports.getFriends = asyncHandler(async (req, res) => {
  const result = await service.getFriends(req.userId, req.body);
  return sendResponse(res, statusCode.OK, true, `Friend list ${successMessage.FETCHED}`, result);
});

// Search all users (with filter + pagination)
exports.allUsers = asyncHandler(async (req, res) => {
  const { page, query = "", limit = 10, filter } = req.body;
  const result = await service.allUsers(query, { page, limit }, req.userId);

  return sendResponse(res, 200, true, `Users ${successMessage.FETCHED}`, result);
});

// Update profile picture
exports.updateProfile = asyncHandler(async (req, res) => {
  const { profilePic } = req.body;
  const userId = req.userId;

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
  const loggedInUserId = req.userId;
  const users = await userService.getAllExcept(loggedInUserId);
  return sendResponse(res, statusCode.OK, true, `Users ${successMessage.FETCHED}`, users);
});
