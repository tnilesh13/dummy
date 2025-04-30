import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice"
import dashboardReducer from "./slice/DashboardSlice"
import userReducer from "./slice/UserSlice";
import chatReducer from "./slice/ChatSlice";
import socketReducer from "./slice/SocketSlice"

const Store = configureStore({
    reducer: {
        AuthReducer: authReducer,
        DashboardReducer: dashboardReducer,
        UserReducer: userReducer,
        ChatReducer: chatReducer,
        SocketReducer: socketReducer
    }
});

export default Store;
