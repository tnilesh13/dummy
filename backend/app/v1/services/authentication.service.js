const User = require("../models/user.model");
const PendingRequest = require("../models/pendingRequest.model");
const { generatePassword } = require("../utils/auth.utils");

exports.createSignupRequest = async (details) => {
    const { fullName, email, phone, password } = details;

    const existingPending = await PendingRequest.findOne({ email });
    if (existingPending) {
        return { status: false, isAlreadyPending: true };
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return { status: false, isAlreadyExist: true };
    }

    const { salt, hash } = await generatePassword(password);

    const pendingRequest = await PendingRequest.create({
        fullName,
        email,
        phone,
        password: hash,
        salt,
    });

    return { status: true, result: pendingRequest };
};

exports.approveSignupRequest = async (requestId) => {
    const pending = await PendingRequest.findById(requestId);
    if (!pending) {
        return { status: false, isNotFound: true };
    }

    const { fullName, email, phone, password, salt } = pending;

    const newUser = await User.create({
        fullName,
        email,
        phone,
        password,
        salt,
    });

    await PendingRequest.findByIdAndDelete(requestId);

    return { status: true, result: newUser };
};

exports.rejectSignupRequest = async (requestId) => {
    const pending = await PendingRequest.findById(requestId);
    if (!pending) {
        return { status: false, isNotFound: true };
    }

    await PendingRequest.findByIdAndDelete(requestId);

    return { status: true };
};
