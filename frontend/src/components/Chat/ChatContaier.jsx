import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import throttle from "lodash.throttle";
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { getMessages, loadMoreMessagesThunk } from '../../redux/thunk/ChatThunk';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import { formatTime } from '../../utils/utils';
import { getSocket } from '../../utils/socket';

const ChatContainer = () => {
  const dispatch = useDispatch();

  const {
    messages,
    selectedUser,
    isMessagesLoading,
    // page,
    // totalCount,
    totalMessages,
    messageCurrentPage,
    messageTotalPages,
  } = useSelector((state) => state.ChatReducer);

  const { currentUserDetails } = useSelector(
    (state) => state.AuthReducer
  );
  const [socketInstance, setSocketInstance] = useState(null);

  useEffect(() => {
    const socket = getSocket();
    setSocketInstance(socket);
  }, []);

  useEffect(() => {
    if (socketInstance && selectedUser) {
      socketInstance.emit("joinChat", {
        senderId: currentUserDetails._id,
        receiverId: selectedUser._id,
      });
    }
  }, [socketInstance, selectedUser]);

  const messageEndRef = useRef(null);
  const containerRef = useRef(null);
  const prevHeightRef = useRef(0);

  useEffect(() => {
    dispatch(getMessages({ userId: selectedUser._id }));
  }, [
    selectedUser._id,
    dispatch,
  ]);

  // Scroll to bottom on messages load (initial chat open)
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleScroll = throttle(() => {
    if (!containerRef.current) return;

    const { scrollTop } = containerRef.current;
    // if (scrollTop === 0 && messages.length < totalMessages) {
    if (scrollTop === 0 && messageCurrentPage < messageTotalPages) {
      prevHeightRef.current = containerRef.current.scrollHeight;
      dispatch(loadMoreMessagesThunk({ userId: selectedUser._id, page: messageCurrentPage + 1 }))
        .then((res) => {
          // Maintain scroll after loading older messages
          setTimeout(() => {
            const newHeight = containerRef.current.scrollHeight;
            containerRef.current.scrollTop = newHeight - prevHeightRef.current;
          }, 100);
        });
    }
  }, 300);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput socketInstance={socketInstance} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4"
        ref={containerRef} onScroll={handleScroll}>
        {messages.map((message, index) => {
          const isUser = message.senderId === currentUserDetails._id;
          const isSending = message.isSending;

          return (
            <div
              key={message._id}
              className={`flex items-start space-x-2 p-1 ${isUser ? 'self-end flex-row-reverse space-x-reverse' : 'self-start'}`}
              ref={index === messages.length - 1 ? messageEndRef : null}
            >
              <div className="w-8 h-8 rounded-full bg-gray-300">
                <img
                  src={
                    isUser
                      ? currentUserDetails.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="w-16 bg-gray-300 rounded">
                  <time className="text-xs opacity-50 ml-1">
                    {formatTime(message.createdAt)}
                  </time>
                </div>
                <div className="relative h-8 w-[200px] bg-gray-300 rounded-lg">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                  {isSending && (
                    <div className="absolute -bottom-5 right-0 text-xs text-yellow-500">Sending...</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <MessageInput socketInstance={socketInstance} />
    </div>
  );
};

export default ChatContainer;
