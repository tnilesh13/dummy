import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URL_SOCKET, {
      query: { userId },
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });
    // socket.connect();
  }

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("Socket disconnected manually");
    socket = null;
  }
};
