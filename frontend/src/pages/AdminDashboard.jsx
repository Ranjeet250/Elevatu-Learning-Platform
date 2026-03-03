import { useState, useEffect } from "react";
import { useAuth } from "../context/Authcontext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCourses, deleteCourse } from "../services/courseService";
import axiosClient from "../services/axiosClient";
import AdminSidebar from "../components/AdminSidebar";
import {
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  Eye,
  Shield,
} from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [coursesRes, statsRes] = await Promise.all([
        getAllCourses(),
        axiosClient.get("/admin/stats"),
      ]);
      setCourses(coursesRes.data?.courses || []);
      setStats(statsRes.data?.stats || null);
      setRecentUsers(statsRes.data?.recentUsers || []);
    } catch (error) {
      console.error("Error:", error);
      // Fallback: just load courses
      try {
        const coursesRes = await getAllCourses();
        setCourses(coursesRes.data?.courses || []);
      } catch {
        toast.error("Failed to load data");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
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
    toast.success("Logged out");
  };

  const statCards = [
    {
      label: "Total Courses",
      value: stats?.totalCourses ?? courses.length,
      icon: BookOpen,
      color: "from-blue-500 to-indigo-600",
    },
    {
      label: "Total Users",
      value: stats?.totalUsers ?? "-",
      icon: Users,
      color: "from-emerald-500 to-teal-600",
    },
    {
      label: "Total Enrollments",
      value: stats?.totalEnrollments ?? "-",
      icon: TrendingUp,
      color: "from-violet-500 to-purple-600",
    },
    {
      label: "Revenue",
      value:
        stats?.totalRevenue != null
          ? `₹${stats.totalRevenue.toLocaleString()}`
          : "-",
      icon: DollarSign,
      color: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <div className="flex h-screen bg-surface-50">
      <AdminSidebar user={user} onLogout={handleLogout} />

      <div className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-surface-900">
                Admin Dashboard
              </h1>
              <p className="text-surface-500 mt-1">
                Welcome back, {user?.name}
              </p>
            </div>
            <button
              onClick={fetchData}
              className="btn-ghost border border-surface-200 rounded-xl flex items-center gap-2 text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map(({ label, value, icon: Icon, color }, i) => (
              <div key={label} className="card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-surface-900">
                  {loading ? "..." : value}
                </p>
                <p className="text-sm text-surface-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Courses Table */}
            <div className="lg:col-span-2 card overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-surface-100">
                <h2 className="text-lg font-semibold text-surface-900">
                  Courses ({courses.length})
                </h2>
                <button
                  onClick={() => navigate("/admin/add-course")}
                  className="btn-primary text-sm flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Add Course
                </button>
              </div>

              {loading ? (
                <div className="p-8 text-center text-surface-500">
                  Loading...
                </div>
              ) : courses.length === 0 ? (
                <div className="p-12 text-center">
                  <BookOpen className="w-12 h-12 text-surface-300 mx-auto mb-3" />
                  <p className="text-surface-500 mb-4">No courses yet</p>
                  <button
                    onClick={() => navigate("/admin/add-course")}
                    className="btn-primary text-sm"
                  >
                    Create First Course
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-surface-100">
                        <th className="text-left px-5 py-3 text-xs font-medium text-surface-500 uppercase tracking-wider">
                          Course
                        </th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-surface-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-surface-500 uppercase tracking-wider">
                          Students
                        </th>
                        <th className="text-right px-5 py-3 text-xs font-medium text-surface-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.slice(0, 10).map((course) => (
                        <tr
                          key={course._id}
                          className="border-b border-surface-50 hover:bg-surface-50 transition-colors"
                        >
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              {course.thumbnail ? (
                                <img
                                  src={course.thumbnail}
                                  alt=""
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                                  <BookOpen className="w-4 h-4 text-primary-600" />
                                </div>
                              )}
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-surface-900 truncate max-w-[200px]">
                                  {course.title}
                                </p>
                                <p className="text-xs text-surface-500">
                                  {course.category} · {course.level}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm text-surface-700">
                            {course.price === 0 ? "Free" : `₹${course.price}`}
                          </td>
                          <td className="px-5 py-3 text-sm text-surface-700">
                            {course.enrolledStudents?.length || 0}
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() =>
                                  navigate(`/courses/${course._id}`)
                                }
                                className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-surface-600"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  navigate(`/admin/edit-course/${course._id}`)
                                }
                                className="p-1.5 rounded-lg hover:bg-primary-50 text-surface-400 hover:text-primary-600"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(course._id)}
                                className="p-1.5 rounded-lg hover:bg-red-50 text-surface-400 hover:text-red-600"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Recent Users */}
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-surface-100">
                <h2 className="text-lg font-semibold text-surface-900">
                  Recent Users
                </h2>
                <Link
                  to="/admin/users"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  View All
                </Link>
              </div>

              {recentUsers.length > 0 ? (
                <div className="divide-y divide-surface-50">
                  {recentUsers.map((u) => (
                    <div key={u._id} className="flex items-center gap-3 p-4 hover:bg-surface-50 transition-colors">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                        {u.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-surface-900 truncate">
                          {u.name}
                        </p>
                        <p className="text-xs text-surface-500 truncate">
                          {u.email}
                        </p>
                      </div>
                      <span
                        className={`badge text-xs ${u.role === "admin"
                            ? "bg-primary-100 text-primary-700"
                            : "bg-surface-100 text-surface-600"
                          }`}
                      >
                        {u.role}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-surface-500">
                  <Users className="w-10 h-10 text-surface-300 mx-auto mb-3" />
                  <p className="text-sm">No users data available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
