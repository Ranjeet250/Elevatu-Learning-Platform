import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:4003/api",
});

// Interceptor to add token to requests
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("elevateToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
