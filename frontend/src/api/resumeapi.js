import axios from "axios";

const API_URL = "http://localhost:4003/api/resumes";

export const analyzeResume = async (formData) => {
  // ✅ Don't destructure `data` here, return it directly
  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
