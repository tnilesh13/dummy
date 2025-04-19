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

exports.validPassword = (password, hash, salt) => {
    if(!password) {
        return false
    }
    const checkHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === checkHash
}

exports.generateToken = (details) => {
    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY
    const payload = {
        id: details.id,
        data: new Date(),
        // user: {
        //     username: user.name,
        //     email: user.email,
        //     id: user.id
        // }
    }
    const options = {
        expiresIn: '1h',
    };

    const token = jwt.sign(payload, secretKey, options);
    return token;
};