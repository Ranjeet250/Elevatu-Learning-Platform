import axiosClient from "./axiosClient";

// Public - Get all courses
export const getAllCourses = async (filters = {}) => {
  try {
    let url = "/courses";
    const params = new URLSearchParams();
    
    if (filters.category) params.append("category", filters.category);
    if (filters.subcategory) params.append("subcategory", filters.subcategory);
    if (filters.level) params.append("level", filters.level);
    
    if (params.toString()) url += `?${params.toString()}`;
    
    const response = await axiosClient.get(url);
    return response;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

// Public - Get single course
export const getCourseById = (id) => axiosClient.get(`/courses/${id}`);

// Admin - Create course
export const createCourse = async (courseData) => {
  try {
    const response = await axiosClient.post("/courses", courseData);
    return response;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

// Admin - Update course
export const updateCourse = (id, courseData) =>
  axiosClient.put(`/courses/${id}`, courseData);

// Admin - Delete course
export const deleteCourse = (id) => axiosClient.delete(`/courses/${id}`);

// Admin - Add roadmap step
export const addRoadmapStep = (courseId, stepData) =>
  axiosClient.post(`/courses/${courseId}/roadmap-step`, stepData);

// Admin - Publish course
export const publishCourse = (id) => axiosClient.post(`/courses/${id}/publish`);

// Admin - Get all admin courses
export const getAdminCourses = () => axiosClient.get("/courses/admin/my-courses");

// Student - Enroll in course
export const enrollCourse = (id) => axiosClient.post(`/courses/${id}/enroll`);
