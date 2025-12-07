import { useState, useEffect } from "react";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCourses, deleteCourse } from "../services/courseService";
import AdminSidebar from "../components/AdminSidebar";
import CourseList from "../components/CourseList";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    
    // Auto-refresh every 3 seconds
    const interval = setInterval(fetchCourses, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getAllCourses();
      
      if (res.data && res.data.courses && Array.isArray(res.data.courses)) {
        console.log("Courses updated:", res.data.courses.length);
        setCourses(res.data.courses);
      } else {
        console.warn("Invalid courses response:", res.data);
        setCourses([]);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      toast.error("Failed to fetch courses");
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
    toast.success("Logged out successfully");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar user={user} onLogout={handleLogout} />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {user?.name}!
            </h1>
            <p className="text-gray-600 mt-2">Manage your courses efficiently</p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Courses</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {courses.length}
                  </p>
                </div>
                <div className="text-4xl">Book</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    ${courses.reduce((sum, c) => sum + (c.price || 0), 0).toFixed(2)}
                  </p>
                </div>
                <div className="text-4xl">Money</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Your Role</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2 capitalize">
                    {user?.role}
                  </p>
                </div>
                <div className="text-4xl">User</div>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Your Courses</h2>
                <div className="flex gap-2">
                  <button
                    onClick={fetchCourses}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Refresh
                  </button>
                  <button
                    onClick={() => navigate("/admin/add-course")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    + Add New Course
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-600">Loading courses...</div>
            ) : courses.length === 0 ? (
              <div className="p-8 text-center text-gray-600">
                <p className="mb-4">No courses created yet</p>
                <button
                  onClick={() => navigate("/admin/add-course")}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Your First Course
                </button>
              </div>
            ) : (
              <CourseList
                courses={courses}
                onDelete={handleDelete}
                onEdit={(id) => navigate(`/admin/edit-course/${id}`)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
