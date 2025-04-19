import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (details, { rejectWithValue }) => {
        try {
            // const response = await axios.post(`${process.env.REACT_APP_API_BASEURL}api/v1/login`, details)
            const response = await axios.post(`${import.meta.env.VITE_API_URL}api/v1/login`, details,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                })
            if (!response?.data?.status) {
                return rejectWithValue(response.data.message);
            }
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.message);
        }
    }
);
