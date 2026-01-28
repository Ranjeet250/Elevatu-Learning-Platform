import axios from "axios";

// Use environment variable or default to localhost
const API_URL = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:4003/api"}/resumes`;

export const analyzeResume = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 120000, // 2 minutes for analysis
    });
    
    if (!response.data) {
      throw new Error("No response data from server");
    }
    
    return response.data;
  } catch (error) {
    console.error("Resume analysis error:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to analyze resume"
    );
  };

export const getAllResumes = async () => {
  try {
    const response = await axios.get(API_URL, {
      timeout: 30000,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching resumes:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch resumes"
    );
  }
};
