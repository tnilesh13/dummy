const asyncHandler = require("express-async-handler");
const messageService = require("../services/message.service");
const { sendResponse } = require("../utils/sendResponse.utils");
const { statusCode } = require("../constants/constants");

exports.getMessages = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;
  const userToChatId = req.params.id;
  const { page = 1, limit = 20 } = req.query;

  const { messages, totalCount } = await messageService.getChatMessages({
    user1: loggedInUserId,
    user2: userToChatId,
    page,
    limit,
  });

  return sendResponse(res, statusCode.OK, true, "Messages fetched", { messages, totalCount });
});
