import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTokenFromLocalStorage } from "../../utils/storageUtility";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

export const getUsersThunk = createAsyncThunk(
  "users/getUsers",
  async ({ page, search, limit = 20, filter = "" }, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage();
      const response = await axiosInstance.post(
        "auth/user/users",
        { page, query: search, limit, filter },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": true,
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, { id: '1' })
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const sendFriendRequestThunk = createAsyncThunk(
  "users/sendFriendRequest",
  async ({ receiverId }, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage();
      const response = await axiosInstance.post(
        "auth/friend/friend-request/sent",
        { receiverId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      toast.success("Friend request sent!");
      return { receiverId };
    } catch (error) {
      toast.error(error.response?.data?.message || "Request failed");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const acceptFriendRequestThunk = createAsyncThunk(
  "user/acceptFriendRequest",
  async ({ senderId }, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage();
      const response = await axiosInstance.post("/auth/friend/friend-request/accept", { senderId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Request Accepted successfully", { id: '1' });
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, { id: '1' })
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const rejectFriendRequestThunk = createAsyncThunk(
  "user/rejectFriendRequest",
  async ({ senderId }, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage();
      const response = await axiosInstance.post("/auth/friend/friend-request/reject", { senderId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Request Rejected successfully", { id: '1' });
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, { id: '1' })
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
