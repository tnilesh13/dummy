const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/sendResponse.utils");
const { statusCode, errorMessage } = require("../constants/constants");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendResponse(
      res,
      statusCode.UNAUTHORIZED,
      false,
      errorMessage.UNAUTHORIZED
    );
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || !decoded?.id) {
      return sendResponse(
        res,
        statusCode.UNAUTHORIZED,
        false,
        errorMessage.UNAUTHORIZED
      );
    }

    req.userId = decoded.id;
    return next(); // return next to prevent fall-through
  });
});

module.exports = authMiddleware;
