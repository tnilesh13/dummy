const Chat = require("../models/chatModel.js");
const User = require("../models/userModel.js");
// const partnerService = require("../service/partner.service.js");
const { successMessage, errorMessage } = require("../constants/constants.js")
    //    ../constants/messages.js");

// add chat 
exports.addChat = async (chatDetails) => {
    try {
        // check sender and receiver associated or not 
        const associated = await this.checkSenderAndReceiverAssociated(chatDetails.sender, chatDetails.receiver);
        if (!associated) {
            return { status: false, message: errorMessage.UNAUTHORIZED };
        }
        // get name  
        const userName = associated.name
        let createdData;
        // check already have chat 
        const chatExist = await Chat.findOne({ 'sender.id': chatDetails.sender, 'receiver.id': chatDetails.receiver });
        if (chatExist) {
            const newMessage = {
                msg: chatDetails.chat,
                sendBy: chatDetails.sendBy,
                sendAt: new Date()
            }
            createdData = await Chat.findByIdAndUpdate({ _id: chatExist._id }, { $push: { chat: newMessage } }, { new: true });
        } else {
            // get partner name 
            const parentDetails = await partnerService.getPartnerById(chatDetails.receiver);
            if (!parentDetails) {
                return { status: false, message: `Partner ${errorMessage.DATA_NOT_FOUND}` };
            }
            const parentName = parentDetails.name;
            chatDetails.sender = { id: chatDetails.sender, name: userName };
            chatDetails.receiver = { id: chatDetails.receiver, name: parentName };
            const message = {
                msg: chatDetails.chat,
                sendBy: chatDetails.sendBy,
                sendAt: new Date()
            }
            chatDetails.chat = message
            // get user name 
            createdData = await Chat.create(chatDetails);
        }
        createdData = createdData.toObject();
        const length = createdData?.chat?.length
        createdData.chat = createdData?.chat[length - 1]
        return { status: true, message: successMessage.DATA_CREATED, createdData };
    } catch (err) {
        console.log('Add Chat Error :', err);
    }
};

// check sender and receiver associated
exports.checkSenderAndReceiverAssociated = async (sender, receiver) => {
    // check user have current partner or not 
    // const userExist = await User.findOne({ id: sender, partner_id: receiver });
    // return userExist;
    const user = await User.findOne({ _id: sender });
    const userAssociated = user?.friendIds?.includes(receiver);
    return userAssociated;
}

// get current sender and receiver history
exports.getCurrentSenderAndReceiverHistory = async (sender, receiver) => {
    const chatRoom = [sender, receiver].sort().join("_"); // Match room naming
    const chat = await Chat.findOne({ room: chatRoom }).populate("messages.sender", "name");

    return chat ? chat.messages : []; // Return only the messages
};

// get login user related all users list
exports.getUsersList = async (id) => {
    try {
        const result = await Chat.find({ 'receiver.id': id }).populate('receiver.id', 'name')
        if (result?.length && result[0]?.sender && result[0]?.receiver) {
            for (const data of result) {
                console.log(data.sender);
                data.sender = {
                    id: data.sender?.id,
                    name: data.sender?.name
                }
                data.receiver = {
                    id: data.receiver?.id?._id,
                    name: data.receiver?.id?.name
                }
            }
        }
        return result;
    } catch (err) {
        console.log('Error in User List Chat :', err);
    }
}

// check user associated with chat
exports.checkUserAssociatedWithChat = async (chatId, msgId, userId) => {
    const result = await Chat.findOne({ _id: chatId });
    if (!result) {
        return false;
    }
    const chat = result.chat.find(msg => msg._id.toString() === msgId && msg.sendBy.toString() === userId);
    return chat;
}

// update chat 
exports.updateChat = async (chatDetails) => {
    // check sender and receiver associated or not 
    const associated = await this.checkUserAssociatedWithChat(chatDetails.chatId, chatDetails.msgId, chatDetails.userId);
    if (!associated) {
        return { status: false, message: errorMessage.UNAUTHORIZED };
    }
    const result = await Chat.findOneAndUpdate(
        { _id: chatDetails.chatId, 'chat._id': chatDetails.msgId },
        { $set: { 'chat.$.msg': chatDetails.message } },
        { new: true }
    );
    if (result && result.chat && result.chat.length > 0) {
        const updatedMessage = result.chat.find(msg => msg._id.toString() === chatDetails.msgId.toString());
        let details = {};
        details.sender = result.sender;
        details.receiver = result.receiver;
        details._id = result._id;
        details.updatedMessage = updatedMessage;
        details.createdAt = result.createdAt;
        details.updatedAt = result.updatedAt;
        return { status: true, message: details };
    } else {
        return { status: false, message: "Message not found or not updated" };
    }
}

// delete chat 
exports.deleteChat = async (chatDetails) => {
    // check sender and receiver associated or not 
    const associated = await this.checkUserAssociatedWithChat(chatDetails.chatId, chatDetails.msgId, chatDetails.userId);
    if (!associated) {
        return { status: false, message: errorMessage.UNAUTHORIZED };
    }
    const result = await Chat.findByIdAndUpdate(
        { _id: chatDetails.chatId },
        { $pull: { chat: { _id: chatDetails.msgId } } },
        { new: true }
    );
    return { status: true, message: result }
}

// search chat 
exports.search = async (chatDetails) => {

    const result = await User.find({
        partner_id: chatDetails.userId,
        $or: [
            // {
            //     firstName: { $regex: chatDetails.query, $options: 'i' }
            // },
            // {
            //     lastName: { $regex: chatDetails.query, $options: 'i' }
            // }
            {
                name: { $regex: chatDetails.query, $options: 'i'}
            }
        ]
    })

    return result
}