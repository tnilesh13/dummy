const User = require("../models/user.model");
const cloudinary = require("../config/cloudinary");

// Get all users (with filter + pagination)
exports.allUsers = async (query, { limit = 500, page = 1 }) => {
  const offset = (page - 1) * limit;

  const matchConditions = {
    $or: [
      { fullName: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } },
    ],
  };

  //   {
  //     $lookup: {
  //         from: "Users",
  //         localField: "friendIds",
  //         foreignField: "_id",
  //         as: "friendDetails"
  //     }
  // },
  // {
  //     $unwind: {
  //         path: "$friendDetails",
  //         preserveNullAndEmptyArrays: true
  //     }
  // },
  const pipeline = [
    {
      $match: matchConditions,
    },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: offset }, { $limit: limit }],
      },
    },
  ];

  const [result] = await User.aggregate(pipeline);
  return {
    users: result.data,
    total: result.metadata[0]?.total || 0,
    page,
    totalPages: Math.ceil((result.metadata[0]?.total || 0) / limit),
  };
};

// Get friend list with filter + pagination
exports.getFriends = async (userId, { limit = 10, page = 1, filter = "" }) => {
  const offset = (page - 1) * limit;

  // Find the user and apply filters
  const user = await User.findById(userId).populate({
    path: "friendIds",
    select: "fullName email profilePic",
    match: {
      $or: [
        { fullName: { $regex: filter, $options: "i" } },
        { email: { $regex: filter, $options: "i" } },
      ],
    },
    options: { skip: offset, limit },
  });

  const totalFriends = await User.countDocuments({
    _id: { $in: user.friendIds },
    $or: [
      { fullName: { $regex: filter, $options: "i" } },
      { email: { $regex: filter, $options: "i" } },
    ],
  });

  return {
    friends: user.friendIds,
    totalFriends,
    currentPage: page,
    totalPages: Math.ceil(totalFriends / limit),
  };
};

// Update user profile picture
exports.updateUserProfile = async (userId, profilePic) => {
  const upload = await cloudinary.uploader.upload(profilePic);
  return await User.findByIdAndUpdate(
    userId,
    { profilePic: upload.secure_url },
    { new: true }
  );
};

// Exclude a user by ID (for sidebar list)
exports.getAllExcept = async (excludedUserId) => {
  return await User.find({ _id: { $ne: excludedUserId } }).select("-password");
};

// Get a single user by ID
exports.getUserById = async (id) => {
  return await User.findById(id);
};
