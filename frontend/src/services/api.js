import axios from "axios";

// Get base URL from environment or use default
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4003/api";

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // 15 second timeout
});

// Request interceptor to add token and handle errors
API.interceptors.request.use(
  (config) => {
    const elevateUser = localStorage.getItem("elevateUser");
    if (elevateUser) {
      try {
        const { token } = JSON.parse(elevateUser);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error parsing auth token:", error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor to handle token expiration
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("elevateUser");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Auth APIs
export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);

// Roadmap API
export const createRoadmap = (data) => {
  const token = JSON.parse(localStorage.getItem("elevateUser"))?.token;

  return API.post("/roadmaps", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
