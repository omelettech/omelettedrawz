import axios from "axios";
import {BASE_URL} from "../services/apiClient";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // Handle the error
    }
);

export default axiosInstance;
