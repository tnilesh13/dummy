import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersThunk } from "../../redux/thunk/UserThunk";

const UserList = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");

    const { users, currentPage, totalPages, isUsersLoading } = useSelector((state) => state.UserReducer);

    useEffect(() => {
        dispatch(getUsersThunk({ page: 1, search: searchQuery, limit: 20, filter: "" }));
    }, [dispatch]);

    const handleSentRequest = () => {
    }

    return (
        <div className="container p-5 grid grid-cols-2 md:grid-cols-3">
            {users.map((user) => (
                <div className="bg-gray-200 p-2 m-4 flex flex-col items-center justify-center">
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
                    <button className="bg-black text-white p-2 rounded-xl text-sm"
                        onClick={handleSentRequest}>
                        Add Friend
                    </button>
                </div>
            ))}

        </div>
    );
}

export default UserList;
