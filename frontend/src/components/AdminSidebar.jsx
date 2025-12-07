import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar({ user, onLogout }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white h-screen overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-blue-600">
        <h1 className="text-2xl font-bold">ElevateU Admin</h1>
        <p className="text-blue-200 text-sm mt-1">Course Management</p>
      </div>

      {/* User Info */}
      <div className="p-4 m-4 bg-blue-600 rounded-lg">
        <p className="text-sm text-blue-200">Logged in as</p>
        <p className="font-semibold text-lg truncate">{user?.name}</p>
        <p className="text-xs text-blue-200">{user?.email}</p>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        <Link
          to="/admin"
          className={`block px-4 py-2 rounded-lg transition ${
            isActive("/admin")
              ? "bg-blue-600"
              : "hover:bg-blue-600 text-blue-100"
          }`}
        >
          Dashboard
        </Link>

        <Link
          to="/admin/add-course"
          className={`block px-4 py-2 rounded-lg transition ${
            isActive("/admin/add-course")
              ? "bg-blue-600"
              : "hover:bg-blue-600 text-blue-100"
          }`}
        >
          Add Course
        </Link>

        <Link
          to="/courses"
          className="block px-4 py-2 rounded-lg hover:bg-blue-600 text-blue-100 transition"
        >
          View All Courses
        </Link>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-blue-600">
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
