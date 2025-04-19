const User = require('../models/userModel')
const {generatePassword} = require('../utils/passwordUtils')

//signup
exports.createUser = async (details) => {
    const isAlreadyExist = await User.findOne({email: details.email})
    if (isAlreadyExist) {
        return {
            status: false,
            isAlreadyExist: true
        }
    }

    const bodyPassword = details.password
    const {salt, hash} = await generatePassword(bodyPassword)
    const {password, ...bodyDetails} = details
    const userDetails = {...bodyDetails, password: hash, salt: salt}
    const user = await User.create(userDetails)

    return {
        status: true,
        result: user
    }
}



