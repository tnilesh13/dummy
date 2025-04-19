const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/sendResponseUtils");
const { statusCode, errorMessage } = require("../constants/constants");

const validateTokenHandler = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        // res.status(401);
        // throw new Error("User Not authorized");
        return sendResponse(
          res,
          statusCode.UNAUTHORIZED,
          false,
          `${errorMessage.UNAUTHORIZED}`
        );
      }
    //   req.user = decoded.user;
    //   next;
      req.userId = decoded.id;
      next();
    });
  }
  if (!token) {
    // res.status(401);
    // throw new Error("User Not authorized, token is missing");
    //
    return sendResponse(
      res,
      statusCode.UNAUTHORIZED,
      false,
      `${errorMessage.UNAUTHORIZED}`
    );
  }
});

module.exports = validateTokenHandler;
