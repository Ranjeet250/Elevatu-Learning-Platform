import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Plus,
  LogOut,
  GraduationCap,
  Shield,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Courses", path: "/admin/courses", icon: BookOpen },
  { name: "Add Course", path: "/admin/add-course", icon: Plus },
  { name: "Users", path: "/admin/users", icon: Users },
];

export default function AdminSidebar({ user, onLogout }) {
  return (
    <aside className="w-64 bg-surface-900 text-white h-screen flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center gap-2 px-5 border-b border-surface-700">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
          <GraduationCap className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-bold">
          ElevateU <span className="text-primary-400 text-sm font-medium">Admin</span>
        </span>
      </div>

      {/* User Info */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-800">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-sm font-semibold flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <div className="flex items-center gap-1 text-xs text-primary-400">
              <Shield className="w-3 h-3" />
              Admin
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            end={path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
              ${isActive
                ? "bg-primary-600 text-white shadow-sm"
                : "text-surface-300 hover:bg-surface-800 hover:text-white"
              }`
            }
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-surface-700">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-surface-300 hover:bg-surface-800 hover:text-white transition-colors mb-1"
        >
          <GraduationCap className="w-5 h-5" />
          View Site
        </Link>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
