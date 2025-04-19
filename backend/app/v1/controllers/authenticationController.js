const asyncHandler = require("express-async-handler");
const service = require("../services/authenticationService.js");
const {sendResponse} = require("../utils/sendResponseUtils.js");
const { statusCode, errorMessage, successMessage } = require("../constants/constants.js")
const { generateToken, validPassword } = require("../utils/passwordUtils.js");
const User = require("../models/userModel.js");

exports.createuser = asyncHandler(async (req, res) => {
    const {name, email, phone, password} = req.body;
    if (!name || !email || !phone || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    try {
        const details = req.body
        const createdUser = await service.createUser(details)
        if (createdUser.isAlreadyExist) {
            return sendResponse(res, statusCode.BAD_REQUEST, false, `User With This Email Already Exists`)
        }
        return sendResponse(res, statusCode.CREATED, true, successMessage.SIGNUP, createdUser.result)
    } catch (error) {
        console.log(error)
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, errorMessage.INTERNAL_SERVER_ERROR)
    }
});

//login
exports.logIn = async (req, res) => {
    try {
        const details = req.body
        const user = await User.findOne({email: details.email})
        if (!user) {
            return sendResponse(res, Constat.NOT_FOUND, false, `User With Given Email ${errorMessage.NOT_FOUND}`)
        }
        const validatedUser = validPassword(details.password, user.password, user.salt)
        console.log(validatedUser, "---")
        const token = await generateToken(user)
        return validatedUser ? sendResponse(res, statusCode.OK, true, successMessage.LOGIN, token) : sendResponse(res, statusCode.OK, false, errorMessage.WRONG_PASSWORD)

    } catch (error) {
        console.log(error)
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, errorMessage.INTERNAL_SERVER_ERROR)
    }
}
