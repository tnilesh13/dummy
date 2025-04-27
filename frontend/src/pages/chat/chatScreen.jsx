import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import FriendsList from "../../components/FriendsList";
import NoChatSelected from '../../components/Chat/NoChatSelected';
import ChatContaier from '../../components/Chat/ChatContaier';

const ChatScreen = () => {
  const { selectedUser } = useSelector((state) => state.ChatReducer);

  return (
    <div className='flex h-full rounded overflow-hidden w-full'>
      <FriendsList />

      {selectedUser ? <ChatContaier /> : <NoChatSelected />}
    </div>
  );
}

const ChatScreen2 = () => {
  const { userId, friendId } = useParams();
  const [socket, setSocket] = useState(null);
  // const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [UserList, setUserList] = useState();

  const dispatch = useDispatch();

  const { chatData, senderId, newMessageData, unReadCount, editedChats } = useSelector((state) => state.ChatReducer);

  useEffect(() => {
    setListLoading(true);
    // const newSocket = io(import.meta.env.VITE_API_URL, { transports: ['websocket'] });

    const newSocket = io(import.meta.env.VITE_API_URL, {
      transports: ['websocket'],
      extraHeaders: {
        'ngrok-skip-browser-warning': 'true'
      }
    });

    console.log("--import.meta.env.VITE_API_URL", import.meta.env.VITE_API_URL);
    console.log("--newSocket", newSocket);

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
      newSocket.emit('joinChat', { sender: userId, receiver: friendId });
    });

    socket.emit('join', userId); //room Id

    newSocket.on('currentHistory', (data) => {
      console.log("---currentHistory", data);

      // if (window?.location?.pathname === "/chat") {
      // setMessages(data?.chat);
      // }
    });

    newSocket.on('addNewMessage', (data) => {
      // setMessages((prevMessages) => [...prevMessages, data]);
      // if (window?.location?.pathname === "/chat") {
      dispatch(setfetchNewMessage(data));
      // }
    });

    newSocket.emit('userList', {
      "id": userId,
      "room": userId
    })

    return () => {
      newSocket.disconnect();
    };
  }, [userId, friendId]);

  const sendMessage = () => {
    if (message.trim()) {

      //   await socket.emit('addNewMessage', {
      //     "sender": senderId, // customer
      //     "receiver": PartnerInfo?._id, // partner
      //     "sendBy": PartnerInfo?._id, // current user
      //     "chat": message,
      //     // "chat": message?.slice(0, 50),
      //     "room": PartnerInfo?._id
      // });
      // const newMessage = {
      //   sender: userId,
      //   receiver: friendId,
      //   text: message,
      //   createdAt: new Date().toISOString(),
      // };
      const newMessage = {
        sender: userId,
        receiver: friendId,
        sendBy: friendId,
        chat: message,
        createdAt: new Date().toISOString(),
        room: userId,
      };

      console.log("---addnewMessage", newMessage);

      socket.emit('addNewMessage', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  useEffect(() => {
    targetElement?.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start"
    });
  }, [chatData]);


  useEffect(() => {
    if (window?.location?.pathname === "/chat") {
      if (newMessageData?.createdData?.chat?.sendBy == senderId || newMessageData?.createdData?.chat?.sendBy === PartnerInfo?._id) {
        dispatch(setchatArray(newMessageData));
        if (newMessageData?.createdData?.chat?.sendBy === PartnerInfo?._id) {
          setMessage('');
        }
      } else {
        if (newMessageData?.createdData && (window?.location?.pathname === "/chat")) {
          dispatch(setunreadCount(newMessageData));
        }
      }
      socket.emit('usersList', {
        id: PartnerInfo._id,
        room: PartnerInfo._id
      });
      socket.on('usersList', (usersList) => {
        setListLoading(false);
        const list = usersList.sort((a, b) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateB - dateA;
        });
        setUserList(list);
      });
      return () => {
        dispatch(setsenderIdtostore(''));
        dispatch(setfetchNewMessage({}));
        dispatch(setChatData({}))
      };
    }
  }, [newMessageData, userId])
  console.log("----chatscreen--messages", messages);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>
      <h2>Chat with {friendId}</h2>
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '10px' }}>
        {messages !== null && messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === userId ? 'right' : 'left',
              backgroundColor: msg.sender === userId ? '#007BFF' : '#E5E5EA',
              color: msg.sender === userId ? 'white' : 'black',
              padding: '10px',
              borderRadius: '10px',
              margin: '5px',
              display: 'inline-block',
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', padding: '10px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          style={{ flexGrow: 1, padding: '10px' }}
        />
        <button onClick={sendMessage} style={{ marginLeft: '10px' }}>Send</button>
      </div>
    </div>
  );
};

export default ChatScreen;
