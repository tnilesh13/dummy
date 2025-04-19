// const WebCustomerModel = require('../models/webCustomer.model')

// //response handlers
// const {SuccessMessage, ErrorMessage} = require("../constants/messages.js");
// const AppChat = require("../models/appChat.model");

// // get current sender and receiver history
// exports.getCurrentSenderAndReceiverHistory = async (sender, receiver) => {
//     console.log(sender,"sender")
//     console.log(receiver,"receiver");
//     const result = await WebCustomerModel.findOne({ _id: sender, 'receiver.id': receiver }).populate('receiver.id', ['name',"chat"]);
//     //console.log(result,"mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm m");
//     if ( result?._id && result?.receiver) {
//         console.log("i hit")
//         result.sender = {
//             id: result?._id,
//             name: result?.name
//         }
//         result.receiver = {
//             id: result.receiver?.id?._id,
//             name: result.receiver?.id?.name
//         }
//     }
//     return result;
// }

// // get login user related all users list
// exports.getUsersList = async () => {
//     try {
//         const result = await WebCustomerModel.find();
//         console.log(result);
//         return result;

//     } catch (err) {
//         console.log('Error in User List Chat :', err);
//     }
// }

// // add chat
// exports.addChat = async (chatDetails) => {
//     try {
//         let createdData;
//         console.log(chatDetails.sendBy,"send by");
//         // check already have chat
//         const chatExist = await WebCustomerModel.findOne({_id: chatDetails.sender});
//         if (chatExist) {
//             const newMessage = {
//                 msg: chatDetails.chat,
//                 sendBy: chatDetails.sendBy,
//                 recievedBy: chatDetails.receiver,
//                 sendAt: new Date()
//             }
//             const newReciverMessage = {
//                 msg: chatDetails.chat,
//                 sendBy: chatDetails.sendBy,
//                 recievedBy: chatDetails.receiver,
//                 sendAt: new Date()
//             }
//             // console.log(newReciverMessage,'new receiver message')
//             // console.log(chatExist)
//             console.log(chatDetails.receiver,"reciever")
//             createdData = await WebCustomerModel.findByIdAndUpdate({_id: chatDetails.sendBy}, {$push: {chat: newMessage}}, {new: true});
//             let recieiversData = await WebCustomerModel.findOneAndUpdate({_id: chatDetails.receiver},{$push:{chat:newReciverMessage}}, {new: true});
//             // console.log(createdData,"receiverrData");
//         } else {
//             return {status: false, message: ErrorMessage.DATA_NOT_FOUND};

//         }
//         createdData = createdData.toObject();
//         const length = createdData?.chat?.length
//         createdData.chat = createdData?.chat[length - 1]
//         console.log(createdData)
//         return {status: true, message: SuccessMessage.DATA_CREATED, createdData};
//     } catch (err) {
//         console.log('Add Chat Error :', err);
//     }
// };


// // update chat
// exports.updateChat = async (chatDetails) => {

//     const result = await WebCustomerModel.findOneAndUpdate(
//         {_id: chatDetails.userId, 'chat._id': chatDetails.msgId},
//         {$set: {'chat.$.msg': chatDetails.message}},
//         {new: true}
//     );
//     if (result && result.chat && result.chat.length > 0) {
//         const updatedMessage = result.chat.find(msg => msg._id.toString() === chatDetails.msgId.toString());
//         let details = {};
//         details.sender = result.sender;
//         details.receiver = result.receiver;
//         details._id = result._id;
//         details.updatedMessage = updatedMessage;
//         details.createdAt = result.createdAt;
//         details.updatedAt = result.updatedAt;
//         return {status: true, message: details};
//     } else {
//         return {status: false, message: "Message not found or not updated"};
//     }
// }


// // delete chat
// exports.deleteChat = async (chatDetails) => {
//     const result = await WebCustomerModel.findByIdAndUpdate(
//         {_id: chatDetails.chatId},
//         {$pull: {chat: {_id: chatDetails.msgId}}},
//         {new: true}
//     );
//     return {status: true, message: result}
// }


// // search chat
// exports.search = async (chatDetails) => {

//     const result = await WebCustomerModel.find({
//         _id: chatDetails.userId,
//         $or: [
//             {
//                 name: {$regex: chatDetails.query, $options: 'i'}
//             },
//             {
//                 email: {$regex: chatDetails.query, $options: 'i'}
//             }
//         ]
//     })

//     return result
// }