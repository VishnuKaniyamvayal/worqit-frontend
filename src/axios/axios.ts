// src/axios/axios.ts
import axios from "axios";
import { message } from "antd";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // needed for cookie refresh
});

// Request interceptor to add auth token from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: bubble errors up; optionally show toast for some statuses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // keep generic messaging here; do NOT force navigation
    if (error.response?.status === 401) {
      // Let AuthProvider detect 401 via thrown error and handle logout
      message.error("Session expired. Please login again.");
    } else if (error.response?.status >= 500) {
      message.error("Server error. Try again later.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
