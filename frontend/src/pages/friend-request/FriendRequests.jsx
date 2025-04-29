import { useDispatch, useSelector } from "react-redux";
import { acceptFriendRequestThunk, rejectFriendRequestThunk } from "../../redux/thunk/UserThunk";
import { getCurrentUserDetailsThunk } from "../../redux/thunk/AuthThunk";
import { useEffect } from "react";
import toast from "react-hot-toast";

const FriendRequests = () => {
  const dispatch = useDispatch();
  const { currentUserDetails } = useSelector(state => state.AuthReducer);
  const requests = currentUserDetails?.friendRequests || [];

  useEffect(() => {
    dispatch(getCurrentUserDetailsThunk());
  }, [dispatch]);

  const handleAcceptFriendRequest = (requestId) => {
    dispatch(acceptFriendRequestThunk({ senderId: requestId })).then(() => {
      dispatch(getCurrentUserDetailsThunk());
    });
  };

  const handleRejectFriendRequest = (requestId) => {
    toast.success("Coming soon")
    // dispatch(rejectFriendRequestThunk({ senderId: requestId }));
  };

  if (!requests.length) {
    return <div className="flex items-center justify-center w-full">No Friend Request Found!!!</div>
  };

  return (
    <div className="p-4 rounded-lg shadow mb-4 w-full">
      <h3 className="text-lg font-semibold">Pending Friend Requests</h3>
      {requests.map((req) => (
        <div key={req._id} className="flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <img src={req.profilePic || "/avatar.png"} className="w-10 h-10 rounded-full" />
            <span>{req.fullName}</span>
          </div>
          <div className="flex gap-2">
            <button
              className="text-green-600 hover:underline"
              onClick={() => handleAcceptFriendRequest(req._id)}
            >
              Accept
            </button>
            <button
              className="text-red-500 hover:underline"
              onClick={() => handleRejectFriendRequest(req._id)}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequests;
