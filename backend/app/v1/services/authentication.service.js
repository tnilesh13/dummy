const User = require("../models/user.model");
const { generatePassword } = require("../utils/auth.utils");

// Signup
exports.createUser = async (details) => {
    const existing = await User.findOne({ email: details.email });
    if (existing) {
        return { status: false, isAlreadyExist: true };
    }

    const { salt, hash } = await generatePassword(details.password);
    const { password, ...rest } = details;
    const newUser = await User.create({
        ...rest,
        password: hash,
        salt,
    });

    return { status: true, result: newUser };
};
