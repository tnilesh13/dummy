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

// Signup Request
exports.signupRequest = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return sendResponse(res, statusCode.BAD_REQUEST, false, "Missing required fields");
  }
  if (password.length < 6) {
    return sendResponse(res, statusCode.BAD_REQUEST, false, "Password must be at least 6 characters");
  }

  const result = await service.createSignupRequest(req.body);

  if (result.isAlreadyPending) {
    return sendResponse(res, statusCode.BAD_REQUEST, false, "Signup request already pending");
  }
  if (result.isAlreadyExist) {
    return sendResponse(res, statusCode.BAD_REQUEST, false, "User with this email already exists");
  }

  return sendResponse(res, statusCode.OK, true, "Signup request submitted successfully");
});

// Admin Approve
exports.approveSignupRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.body;

  const result = await service.approveSignupRequest(requestId);

  if (result.isNotFound) {
    return sendResponse(res, statusCode.NOT_FOUND, false, "Signup request not found");
  }

  return sendResponse(res, statusCode.CREATED, true, "User created successfully", result.result);
});

// Admin Reject
exports.rejectSignupRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.body;

  const result = await service.rejectSignupRequest(requestId);

  if (result.isNotFound) {
    return sendResponse(res, statusCode.NOT_FOUND, false, "Signup request not found");
  }

  return sendResponse(res, statusCode.OK, true, "Signup request rejected successfully");
});

exports.logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return sendResponse(
      res,
      statusCode.NOT_FOUND,
      false,
      errorMessage.INVALID_CREDENTIALS
    );
  }

  const isValid = validatePassword(password, user.password, user.salt);
  if (!isValid) {
    return sendResponse(
      res,
      statusCode.UNAUTHORIZED,
      false,
      errorMessage.INVALID_CREDENTIALS
    );
  }

  const token = await generateToken(user);

  const { password: _p, salt, ...safeUser } = user.toObject();

  return sendResponse(
    res,
    statusCode.OK,
    true,
    successMessage.LOGIN,
    { token, user: safeUser }
  );
});

// exports.logout = asyncHandler(async (req, res) => {
//     res.cookie("jwt", "", { maxAge: 0 });
//     res.status(200).json({ message: "Logged out successfully" });
//   return sendResponse(res, statusCode.OK, true, "Logged out successfully");
// });
