import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice"
import dashboardReducer from "./slice/DashboardSlice"
import userReducer from "../redux/slice/UserSlice";
import chatReducer from "../redux/slice/ChatSlice";

const Store = configureStore({
    reducer: {
        AuthReducer: authReducer,
        DashboardReducer: dashboardReducer,
        UserReducer: userReducer,
        ChatReducer: chatReducer
    }
});

export default Store;
