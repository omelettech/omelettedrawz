import axios from "axios";
import {BASE_URL} from "../services/apiClient";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        console.log("Axios intercepted")
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        if (token) {
            console.log("sending header with ",token)

            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // Handle the error
    }
);

export default axiosInstance;
