import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTokenFromLocalStorage } from "../../utils/storageUtility";
import { axiosInstance } from "../../utils/axios";

export const getFriendList = createAsyncThunk(
  "user/getFriendList",
  async ({ page, search, limit = 10, filter = "" }, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage();
      const response = await axiosInstance.post("auth/user/friends-list", {
        page,
        query: search,
        limit: limit || 10,
        filter
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          "ngrok-skip-browser-warning": true
        }
      });
      return response.data;
    } catch (error) {
      console.log("--getFriendList called error", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getMessages = createAsyncThunk("messages", async ({ userId, page=1 }) => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await axiosInstance.get(`auth/messages/${userId}?page=${page}&limit=20`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        "ngrok-skip-browser-warning": true
      }
    });
    return response.data;
  } catch (error) {
    console.log("--getMessages called error", error);
    return rejectWithValue(error.response?.data?.message || error.message);
  }
})

export const loadMoreMessagesThunk = createAsyncThunk(
  "chat/loadMoreMessages",
  async ({ userId, page }, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage();
      const response = await axiosInstance.get(
        `auth/messages/${userId}?page=${page}&limit=20`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("--loadMoreMessagesThunk error", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
