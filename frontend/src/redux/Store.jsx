import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice"
import dashboardReducer from "./slice/DashboardSlice"
import userReducer from "../redux/slice/UserSlice";
import chatReducer from "../redux/slice/ChatSlice";
import socketReducer from "../redux/slice/SocketSlice"

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
