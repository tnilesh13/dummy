const crypto = require("crypto")
const jwt = require('jsonwebtoken')

exports.generatePassword = async (password) => {
    const salt = crypto.randomBytes(32).toString('hex')
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return {
        salt: salt,
        hash: genHash
    }
}

exports.validatePassword = (password, hash, salt) => {
    if (!password) {
        return false
    }
    const checkHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === checkHash
}

exports.generateToken = ({ id }) => {
    const secretKey = process.env.JWT_SECRET;
    const payload = {
        id,
        issuedAt: new Date().toISOString(),
    };

    const options = {
        expiresIn: "1h",
    };

    return jwt.sign(payload, secretKey, options);
};
