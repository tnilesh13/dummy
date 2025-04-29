import { createSlice } from "@reduxjs/toolkit";
import { getUsersThunk, sendFriendRequestThunk } from "../thunk/UserThunk";

const userSlice = createSlice({
    name: "users",
    initialState: {
        status: "idle",
        users: [],
        isUsersLoading: false,
        currentPage: 1,
        totalPages: 0,
        error: null,
        // sentRequests: [],
    },
    reducers: {
        resetStatus: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsersThunk.pending, (state) => {
                state.status = "loading";
                state.isUsersLoading = true;
            })
            .addCase(getUsersThunk.fulfilled, (state, action) => {
                const { users, totalUsers, currentPage, totalPages } =
                    action.payload?.result || {};
                state.status = "succeeded";
                state.isUsersLoading = false;
                state.users = users;
                state.currentPage = currentPage || 1;
                state.totalPages = totalPages || 0;
            })
            .addCase(getUsersThunk.rejected, (state, action) => {
                state.status = "failed";
                state.isUsersLoading = false;
                state.error = action.payload;
            })
            .addCase(sendFriendRequestThunk.fulfilled, (state, action) => {
                // state.sentRequests.push(action.payload.receiverId);
            });
    },
});

export const { resetStatus } = userSlice.actions;
export default userSlice.reducer;
