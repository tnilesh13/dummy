import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getUsersThunk } from "../thunk/UserThunk";

const userSlice = createSlice({
    name: "users",
    initialState: {
        status: "idle",
        users: [],
        totalPages: 0,
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
    },
});

export const { resetStatus } = userSlice.actions;
export default userSlice.reducer;
