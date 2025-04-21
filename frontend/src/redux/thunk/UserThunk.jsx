import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getTokenFromLocalStorage } from "../../utils/storageUtility";

const BASE_URL = `${import.meta.env.VITE_API_URL}api/v1/auth/user`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const getFriendList = createAsyncThunk(
  "users/getFriendList",
  async ({ page, search, limit = 10, filter = "" }, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage();
      const response = await axiosInstance.post("/friends-list", {
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

export const getUsersThunk = createAsyncThunk(
  "users/getUsers",
  async ({ page, search, limit = 10, filter = "" }, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage();
      const response = await axiosInstance.post("users", {
        page,
        query: search,
        limit: limit || 10,
        filter
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
