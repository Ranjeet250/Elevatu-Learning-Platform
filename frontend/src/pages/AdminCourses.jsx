import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { getAdminCourses, deleteCourse } from "../services/courseService";
import AdminSidebar from "../components/AdminSidebar";
import CourseCard from "../components/CourseCard";
import { toast } from "react-toastify";

export default function AdminCourses() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await getAdminCourses();
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }

    try {
      await deleteCourse(courseId);
      setCourses(courses.filter((c) => c._id !== courseId));
      toast.success("Course deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete course");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar user={user} onLogout={handleLogout} />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Courses</h1>
              <p className="text-gray-600 mt-2">Manage all your courses</p>
            </div>
            <button
              onClick={() => navigate("/admin/create-course")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold"
            >
              + Create New Course
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Loading courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <p className="text-gray-600 text-lg mb-4">No courses created yet</p>
              <button
                onClick={() => navigate("/admin/create-course")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Your First Course
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  isAdmin={true}
                  onDelete={handleDelete}
                  onEdit={(id) => navigate(`/admin/edit-course/${id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

