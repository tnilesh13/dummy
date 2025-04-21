const asyncHandler = require("express-async-handler");
const service = require("../services/authentication.service.js");
const { sendResponse } = require("../utils/sendResponse.utils.js");
const {
  statusCode,
  errorMessage,
  successMessage,
} = require("../constants/constants.js");
const { generateToken, validatePassword } = require("../utils/auth.utils.js");
const User = require("../models/user.model.js");

// Signup
exports.createUser = asyncHandler(async (req, res) => {
  const { fullName, email, phone, password } = req.body;
  if (!fullName || !email || !phone || !password) {
    res.status(statusCode.BAD_REQUEST);
    throw new Error("All fields are mandatory");
  }
  if (password.length < 6) {
    res.status(statusCode.BAD_REQUEST);
    throw new Error("Password must be at least 6 characters");
  }

  const result = await service.createUser(req.body);
  if (result.isAlreadyExist) {
    return sendResponse(
      res,
      statusCode.BAD_REQUEST,
      false,
      `User with this email already exists`
    );
  }

  return sendResponse(res, statusCode.CREATED, true, successMessage.SIGNUP, result.result);
});

// Login
exports.logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return sendResponse(res, statusCode.NOT_FOUND, false, errorMessage.INVALID_CREDENTIALS);
  }

  const isValid = validatePassword(password, user.password, user.salt);
  if (!isValid) {
    return sendResponse(res, statusCode.UNAUTHORIZED, false, errorMessage.INVALID_CREDENTIALS);
  }

  const token = await generateToken(user);
  return sendResponse(res, statusCode.OK, true, successMessage.LOGIN, { token });
});

// exports.logout = asyncHandler(async (req, res) => {
//     res.cookie("jwt", "", { maxAge: 0 });
//     res.status(200).json({ message: "Logged out successfully" });
//   return sendResponse(res, statusCode.OK, true, "Logged out successfully");
// });
