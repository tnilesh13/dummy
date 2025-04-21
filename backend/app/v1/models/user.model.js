const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      require: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone Number is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    salt: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    friendIds: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
