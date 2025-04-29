const asyncHandler = require("express-async-handler");
const { jwtDecode } = require("jwt-decode");
const User = require("../models/user.model");
const service = require("../services/friend.service");
const { sendResponse } = require("../utils/sendResponse.utils");
const { statusCode, successMessage, errorMessage } = require("../constants/constants");

exports.sendFriendRequest = asyncHandler(async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.userId;

  if (!senderId || !receiverId) {
    return sendResponse(res, statusCode.BAD_REQUEST, false, "Sender and Receiver IDs are required");
  }

  const result = await service.sendFriendRequest(senderId, receiverId);

  if (result.isSenderNotFound) {
    return sendResponse(res, statusCode.NOT_FOUND, false, "Sender not found");
  }

  if (result.isReceiverNotFound) {
    return sendResponse(res, statusCode.NOT_FOUND, false, "Receiver not found");
  }

  if (result.isAlreadyRequested) {
    return sendResponse(res, statusCode.BAD_REQUEST, false, "Friend request already sent");
  }

  if (result.isAlreadyFriends) {
    return sendResponse(res, statusCode.BAD_REQUEST, false, "Already friends");
  }

  return sendResponse(res, statusCode.OK, true, "Friend request sent successfully");
});

// Accept Friend Request
exports.acceptFriendRequest = asyncHandler(async (req, res) => {
  const { senderId } = req.body;
  const userId = req.userId;

  if (!userId || !senderId) {
    return sendResponse(res, statusCode.BAD_REQUEST, false, "User and Sender IDs are required");
  }

  const result = await service.acceptFriendRequest(userId, senderId);

  if (result.isUserNotFound) {
    return sendResponse(res, statusCode.NOT_FOUND, false, "User not found");
  }

  if (result.isSenderNotFound) {
    return sendResponse(res, statusCode.NOT_FOUND, false, "Sender not found");
  }

  if (result.isRequestNotFound) {
    return sendResponse(res, statusCode.BAD_REQUEST, false, "Friend request not found");
  }

  return sendResponse(res, statusCode.OK, true, "Friend request accepted successfully");
});
