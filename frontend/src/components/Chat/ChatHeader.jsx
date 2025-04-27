import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../redux/slice/ChatSlice";
import { X } from "lucide-react";

const ChatHeader = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((state) => state.ChatReducer);
    const { onlineUsers } = useSelector((state) => state.SocketReducer);

    const handleChatClose = () => {
        dispatch(setSelectedUser(null));
    }

    return (
        <div className="p-2.5 border-b border-black">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="">
                        <img
                            src={selectedUser.profilePic || "/avatar.png"}
                            alt={selectedUser.fullName}
                            className="size-10 object-cover rounded-full"
                        />
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-100">{selectedUser.fullName}</h3>
                        <p className="text-sm text-gray-200">
                            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>

                <button onClick={handleChatClose}>
                    <X className="text-gray-200"/>
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;
