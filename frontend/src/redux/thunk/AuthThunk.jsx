import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";
import { getTokenFromLocalStorage, setCurrentUserDetailsToLocalStorage } from "../../utils/storageUtility";
import toast from "react-hot-toast";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (details, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`login`, details, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            if (!response?.data?.status) {
                return rejectWithValue(response.data.message);
            }
            toast.success("Logged in successfully", { id: '1' });
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || error.message, { id: '1' })
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async (details, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`signup`, details, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            if (!response?.data?.status) {
                return rejectWithValue(response.data.message);
            }
            toast.success("Account created successfully", { id: '1' });
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || error.message, { id: '1' })
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getCurrentUserDetailsThunk = createAsyncThunk("/getUserDetails", async (_, { rejectWithValue }) => {
    try {
        const token = getTokenFromLocalStorage();

        const response = await axiosInstance.get(`auth/user/user-details`, {
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
        toast.error(error.response?.data?.message || error.message, { id: '1' })
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});
