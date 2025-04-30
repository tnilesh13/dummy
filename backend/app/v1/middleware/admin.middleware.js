const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/sendResponse.utils");
const { statusCode, errorMessage } = require("../constants/constants");
const User = require("../models/user.model");

const adminMiddleware = asyncHandler(async (req, res, next) => {
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

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return sendResponse(
            res,
            statusCode.UNAUTHORIZED,
            false,
            errorMessage.UNAUTHORIZED
        );
    }

    const user = await User.findById(decoded.id);
    if (!user || !user.isAdmin) {
        return sendResponse(res, statusCode.UNAUTHORIZED, false, errorMessage.UNAUTHORIZED);
    }

    req.userId = user._id;
    next();
});

module.exports = adminMiddleware;
