import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
  onlineUsers: [],
};

const SocketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocketConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    updateOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    clearSocketState: (state) => {
      state.isConnected = false;
      state.onlineUsers = [];
    }
  },
});

export const { setSocketConnected, updateOnlineUsers, clearSocketState } = SocketSlice.actions;
export default SocketSlice.reducer;
