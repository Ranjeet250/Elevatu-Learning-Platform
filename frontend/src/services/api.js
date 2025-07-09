import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Auth APIs
export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);

// ✅ Roadmap API — Add this part
export const createRoadmap = (data) => {
  const token = JSON.parse(localStorage.getItem("elevateUser"))?.token;

  return API.post("/roadmaps", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
