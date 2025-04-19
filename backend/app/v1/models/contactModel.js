const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required : [true, "Contact Name is required"]
        },
        email: {
            type: String,
            required : [true, "Contact Email address is required"]
        },
        phone: {
            type: String,
            required : [true, "Contact Phone Number is required"]
        }
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model("Contact", contactSchema);


