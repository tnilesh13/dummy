const expressAsyncHandler = require("express-async-handler");
const { userDetails } = require("../controllers/userController");
const User = require("../models/userModel");

exports.allUsers = async (query, details) => {
    console.log(details, "query");
    const limit = details.limit || 500;
    const page = details.page || 1;
    const filter = details.filter || null;
    const offset = (page - 1) * limit;

    let matchConditions = {
        $or: [
            { name: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
        ]
    };

    // if (filter) {
    //     matchConditions["name"] = { $regex: `^${filter}$`, $options: "i" };
    // }

    let pipeline = [
        {
            $lookup: {
                from: "Users",
                localField: "friendIds",
                foreignField: "_id",
                as: "friendDetails"
            }
        },
        {
            $unwind: {
                path: "$friendDetails",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $match: matchConditions
        },
        {
            $facet: {
                metadata: [{ $count: "total" }],
                data: [{ $skip: offset }, { $limit: limit }]
            }
        }
    ];

    const result = await User.aggregate(pipeline);
    return result;
}

exports.getFriends = async (userId, details) => {
    try {
        const limit = details.limit || 10;
        const page = details.page || 1;
        const filter = details.filter || ""; // Filter string for name/email
        const offset = (page - 1) * limit;

        // Find the user and apply filters
        const user = await User.findById(userId).populate({
            path: "friendIds",
            select: "name email profileImage",
            match: {
                $or: [
                    { name: { $regex: filter, $options: "i" } },
                    { email: { $regex: filter, $options: "i" } }
                ]
            },
            options: { limit, skip: offset }
        });

        // Count total friends matching the filter
        const totalFriends = await User.countDocuments({
            _id: { $in: user.friendIds },
            $or: [
                { name: { $regex: filter, $options: "i" } },
                { email: { $regex: filter, $options: "i" } }
            ]
        });

        return {
            friends: user.friendIds,
            total: totalFriends,
            page,
            totalPages: Math.ceil(totalFriends / limit)
        };
    } catch (err) {
        console.log("Error in fetching friends list:", err);
        return { friends: [], total: 0, page, totalPages: 0 };
    }
};

exports.getUserById = async (id) => {
    const result = await User.findById(id);
    return result;
}
