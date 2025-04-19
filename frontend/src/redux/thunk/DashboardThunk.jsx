import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getTokenFromLocalStorage } from "../../utils/storageUtility";

const BASE_URL = `${import.meta.env.VITE_API_URL}api/v1/auth`;

// Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const getCurrentUserDetailsThunk = createAsyncThunk("/getUserDetails", async (_, { rejectWithValue }) => {
  try {
    const token = getTokenFromLocalStorage();

    const response = await axiosInstance.get(`/user/user-details`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        "ngrok-skip-browser-warning": true
      },
    });
    return response.data;
  } catch (error) {
    console.log("--getCurrentUserDetailsThunk called error", error);

    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
