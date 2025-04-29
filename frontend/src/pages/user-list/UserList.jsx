import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersThunk, sendFriendRequestThunk } from "../../redux/thunk/UserThunk";

const UserList = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");

    const { users, isUsersLoading } = useSelector((state) => state.UserReducer);

    const { currentUserDetails } = useSelector(
        (state) => state.AuthReducer
    );

    useEffect(() => {
        dispatch(getUsersThunk({ page: 1, search: searchQuery }));
    }, [dispatch]);

    const handleSentRequest = (userId) => {
        dispatch(sendFriendRequestThunk({ receiverId: userId })).then(() => {
            dispatch(getUsersThunk({ page: 1, search: searchQuery }));
        });
    };

    if (isUsersLoading) {
        return <div className="w-full flex items-center justify-center">
            Loading...
        </div>
    }

    return (
        <div className="container p-5 grid grid-cols-2 md:grid-cols-3">
            {users.map((user) => {
                const isSent = user?.friendRequests?.includes(currentUserDetails?._id);
                return (
                    <div
                        key={user._id}
                        className="bg-gray-200 p-2 m-4 flex flex-col items-center justify-center"
                    >
                        <div className="flex items-center justify-center">
                            <div className="p-4">
                                <img
                                    src={user?.profilePic || "/avatar.png"}
                                    alt={user?.fullName}
                                    className="size-10 object-cover rounded-full"
                                />
                            </div>
                            {user?.fullName}
                        </div>
                        <button
                            disabled={isSent}
                            className={`${isSent ? "bg-gray-400" : "bg-black"
                                } text-white p-2 rounded-xl text-sm`}
                            onClick={() => handleSentRequest(user._id)}
                        >
                            {isSent ? "Request Sent" : "Add Friend"}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default UserList;
