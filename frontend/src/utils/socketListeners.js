import { pushNewMessage, updateMessageStatus } from "../redux/slice/ChatSlice";
import { updateOnlineUsers } from "../redux/slice/SocketSlice";

export const listenToSocketEvents = (socket, dispatch, getState) => {
  if (!socket) return;

  socket.on("addNewMessage", (newMessage) => {
    const state = getState();
    const selectedUser = state.ChatReducer.selectedUser;
    const currentUser = state.AuthReducer.currentUserDetails;

    const isInCurrentChat =
      (newMessage.senderId === selectedUser?._id && newMessage.receiverId === currentUser?._id) ||
      (newMessage.senderId === currentUser?._id && newMessage.receiverId === selectedUser?._id);

    const isSenderMe = newMessage.senderId === currentUser?._id;

    if (isInCurrentChat) {
      if (isSenderMe && newMessage.tempId) {
        dispatch(updateMessageStatus({ tempId: newMessage.tempId, newMessage })); //updating the sending status
      } else if (!isSenderMe) {
        dispatch(pushNewMessage(newMessage));
      }
    }
  });

  socket.on("getOnlineUsers", (userIds) => {
    dispatch(updateOnlineUsers(userIds));
  });

  console.log("--Socket event listeners registered--");
};

export const clearSocketEvents = (socket) => {
  if (!socket) return;
  socket.off("addNewMessage");
  socket.off("getOnlineUsers");
  console.log("--Socket event listeners cleared--");
};
