import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserDetailsThunk, loginUser, signupUser } from "../thunk/AuthThunk";
import {
    setTokenToLocalStorage,
    removeTokenFromLocalStorage,
    getTokenFromLocalStorage,
} from "../../utils/storageUtility";

const initialState = {
    isLogin: false,
    isLoading: false,
    error: null,
    token: getTokenFromLocalStorage() || "",
    isAuthenticated: !!getTokenFromLocalStorage(),
    isAdmin: false,
    currentUserDetails: null,
    currentUserDetailsStatus: "idle",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isLogin = false;
            state.error = null;
            state.isAuthenticated = false;
            state.token = "";
            state.currentUserDetails = null;
            removeTokenFromLocalStorage();
        },
        setCurrentUserDetails: (state, action) => {
            state.currentUserDetails = action.payload;
        },
        setAuthStatus: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const token = action?.payload?.result?.token;
                state.isLogin = true;
                state.isLoading = false;
                state.token = token;
                state.isAuthenticated = true;
                setTokenToLocalStorage(token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // todo Signup (not used yet)
            .addCase(signupUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                const token = action?.payload?.result?.token;
                state.isLogin = true;
                state.isLoading = false;
                state.token = token;
                state.isAuthenticated = true;
                setTokenToLocalStorage(token);
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getCurrentUserDetailsThunk.pending, (state) => {
                state.currentUserDetailsStatus = "loading";
                state.error = null;
            })
            .addCase(getCurrentUserDetailsThunk.fulfilled, (state, action) => {
                state.currentUserDetailsStatus = "succeeded";
                state.currentUserDetails = action.payload.result;
            })
            .addCase(getCurrentUserDetailsThunk.rejected, (state, action) => {
                state.currentUserDetailsStatus = "failed";
                state.error = action.payload;
            });
    },
});

export const { logout, setAuthStatus, setIsAdmin, setCurrentUserDetails } = authSlice.actions;
export default authSlice.reducer;
