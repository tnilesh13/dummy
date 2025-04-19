import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getFriendList, getUsersThunk } from "../../redux/thunk/UserThunk"

const userSlice = createSlice({
    name: "users",
    initialState: {
        status: "idle",
        users: [],
        totalPages: 0,
        friendsStatus: "idle",
        currentPageFriends: 1,
        friends: [],
        totalFriends: 0,
        error: null,
        isAdding: null,
        isDeleting: null,
        isUpdating: null,
    },
    reducers: {
        resetStatus: (state) => {
            state.isDeleting = null;
            state.isUpdating = null;
            state.isAdding = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsersThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getUsersThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = action.payload?.result[0].data || []
                if (typeof action.payload.result[0].metadata !== 'undefined' && action.payload.result[0].metadata.length > 0) {
                    state.totalPages = Math.ceil(action.payload.result[0].metadata[0].total / 5);
                } else {
                    state.totalPages = 0;
                }
            })
            .addCase(getUsersThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getFriendList.pending, (state) => {
                state.friendsStatus = "loading";
            })
            .addCase(getFriendList.fulfilled, (state, action) => {
                state.friendsStatus = "succeeded";
                state.friends = action.payload?.result?.friends || []
                state.totalFriends = action.payload?.result?.totalPages || 0
                // state.friends = action.payload?.result[0].data || []
                // if (typeof action.payload.result[0].metadata !== 'undefined' && action.payload.result[0].metadata.length > 0) {
                //     state.totalFriends = Math.ceil(action.payload.result[0].metadata[0].total / 5);
                // } else {
                //     state.totalFriends = 0;
                // }
            })
            .addCase(getFriendList.rejected, (state, action) => {
                state.friendsStatus = "failed";
                state.error = action.payload;
            })
    },
});

export const { resetStatus } = userSlice.actions;
export default userSlice.reducer;
