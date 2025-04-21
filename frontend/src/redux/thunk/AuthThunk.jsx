import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getTokenFromLocalStorage, setCurrentUserDetailsToLocalStorage } from "../../utils/storageUtility";

const BASE_URL = import.meta.env.VITE_API_URL;

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (details, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}api/v1/login`, details, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            if (!response?.data?.status) {
                return rejectWithValue(response.data.message);
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async (details, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}api/v1/signup`, details, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            if (!response?.data?.status) {
                return rejectWithValue(response.data.message);
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getCurrentUserDetailsThunk = createAsyncThunk("/getUserDetails", async (_, { rejectWithValue }) => {
    try {
        const token = getTokenFromLocalStorage();

        const response = await axios.get(`${BASE_URL}api/v1/auth/user/user-details`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "ngrok-skip-browser-warning": true
            },
        });
        setCurrentUserDetailsToLocalStorage(response?.data?.result);
        return response.data;
    } catch (error) {
        console.log("--getCurrentUserDetailsThunk called error", error);

        return rejectWithValue(error.response?.data?.message || error.message);
    }
});
