import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { getFriendList } from "../redux/thunk/ChatThunk";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/slice/ChatSlice";
import FriendsListSkeleton from "./skeletons/FriendsListSkeleton";

const FriendsList = () => {
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    const dispatch = useDispatch();

    const { friends, currentPageFriends, isFriendsLoading, totalFriends, selectedUser } = useSelector((state) => state.ChatReducer);
    const { onlineUsers } = useSelector((state) => state.SocketReducer);

    useEffect(() => {
        dispatch(getFriendList({ page: currentPageFriends, search: "" }));
    }, [dispatch, currentPageFriends,]); //searchQuery

    const filteredUsers = showOnlineOnly ? friends.filter((friend) => onlineUsers.includes(friend._id)) : friends;

    const handleSelectedUser = (user) => {
        if (user?._id !== selectedUser?._id) {
            dispatch(setSelectedUser(user));
        }
    }

    if (isFriendsLoading) return <FriendsListSkeleton />;

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-black flex flex-col transition-all duration-200">
            <div className="border-b border-black w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="size-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
                <div className="mt-3 hidden lg:flex items-center gap-2">
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={(e) => setShowOnlineOnly(e.target.checked)}
                            className="checkbox"
                        />
                        <span className="text-sm">Show online only</span>
                    </label>
                    <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
                </div>
            </div>

            <div className="overflow-y-auto w-full py-3">
                {filteredUsers.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => handleSelectedUser(user)}
                        className={`
              w-full p-3 flex items-center gap-3
              hover:bg-black transition-colors
              ${selectedUser?._id === user._id ? "bg-black ring-1 ring-black" : ""}
            `}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <img
                                src={user.profilePic || "/avatar.png"}
                                alt={user.fullName}
                                className="size-12 object-cover rounded-full"
                            />
                            {onlineUsers.includes(user._id) && (
                                <span
                                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                                />
                            )}
                        </div>

                        <div className="hidden lg:block text-left min-w-0">
                            <div className="font-medium truncate text-white">{user.fullName}</div>
                            <div className="text-sm text-zinc-400">
                                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                            </div>
                        </div>
                    </button>
                ))}

                {filteredUsers.length === 0 && (
                    <div className="text-center text-zinc-500 py-4">No online users</div>
                )}
            </div>
        </aside>
    );
};

export default FriendsList;
