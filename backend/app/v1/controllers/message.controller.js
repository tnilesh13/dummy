const asyncHandler = require("express-async-handler");
const messageService = require("../services/message.service");
const { sendResponse } = require("../utils/sendResponse.utils");
const { statusCode, successMessage } = require("../constants/constants");

exports.getMessages = asyncHandler(async (req, res) => {
  const loggedInUserId = req.userId;
  const userToChatId = req.params.id;
  const limit = req.query.limit || 20;
  let page = req.query.page || 1;
  page = Number(page) || 1;

  const result = await messageService.getChatMessages({
    user1: loggedInUserId,
    user2: userToChatId,
    page,
    limit,
  });

  return sendResponse(res, statusCode.OK, true, `Messages ${successMessage.FETCHED}`, result);
});

exports.deleteChatWithUser = asyncHandler(async (req, res) => {
  const { userId1, userId2 } = req.body;
  await messageService.deleteChatBetweenUsers(userId1, userId2);
  return sendResponse(res, statusCode.OK, true, "Chat between users deleted");
});

exports.deleteAllChats = asyncHandler(async (req, res) => {
  await messageService.deleteAllChats();
  return sendResponse(res, statusCode.OK, true, "All chats deleted");
});
