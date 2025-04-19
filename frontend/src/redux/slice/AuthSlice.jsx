import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../thunk/AuthThunk";
import { removeTokenFromLocalStorage } from "../../utils/storageUtility";

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        isLogin: false,
        isLoading: false,
        error: null,
        token: "",
        isAuthenticated: false,
        isAdmin: false,

    },
    reducers: {
        logout: (state) => {
            state.isLogin = false;
            state.error = null;
            removeTokenFromLocalStorage();
        },
        login: (state) => {
            state.isAuthenticated = true;
        },
        setAuthStatus: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLogin = true;
                state.isLoading = false;
                state.token = action?.payload?.result;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});

export const { logout, setAuthStatus, setIsAdmin } = AuthSlice.actions;
export default AuthSlice.reducer;
