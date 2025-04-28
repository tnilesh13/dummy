import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTokenFromLocalStorage } from "../../utils/storageUtility";
import { axiosInstance } from "../../utils/axios";

export const getUsersThunk = createAsyncThunk(
  "users/getUsers",
  async ({ page, search, limit = 10, filter = "" }, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage();
      const response = await axiosInstance.post("auth/user/users", {
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
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
