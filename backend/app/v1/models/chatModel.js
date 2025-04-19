const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    msg: {
        type: mongoose.Schema.Types.Mixed,
    },
    sendBy: {
        type: String,
    },
    sendAt: {
        type: Date,
        default: Date.now
    }
});

const userChatSchema = new mongoose.Schema({
    sender: {
        id: {
            type: String,
            ref: 'User'
        },
        name: {
            type: String
        }
    },
    receiver: {
        id: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        name: {
            type: String
        }
    },
    chat: [chatSchema]
},
    { 'timestamps': true }
);

const Chat = mongoose.model("chat", userChatSchema);

module.exports = Chat;


// const mongoose = require('mongoose');

// const webCustomerSchema = new mongoose.Schema({
//     name:{
//         type:String,
//     },
//     email:{
//         type:String,
//     },
//     receiver: {
//         id: {
//             type: mongoose.Types.ObjectId,
//             ref: 'webCustomer'
//         },
//         name: {
//             type: String
//         }
//     },
//     phone:{
//         type:Number,
//     },
//     chat: [chatSchema],
//     isAdmin:{
//         type: Boolean,
//         default: false
//     }
// })

// const WebCustomerModel =  mongoose.model("webCustomer", webCustomerSchema);
// module.exports = WebCustomerModel;
