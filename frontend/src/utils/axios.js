import axios from "axios";
import { removeTokenFromLocalStorage } from "./storageUtility";
import toast from "react-hot-toast";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // withCredentials: true, //sending cookies in request
    },
});

// interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            console.log("Session expired. Logging out...");

            toast.error("Session expired. Please login again.");
            removeTokenFromLocalStorage();
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);
