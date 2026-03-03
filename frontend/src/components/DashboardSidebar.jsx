import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import {
    LayoutDashboard,
    BookOpen,
    StickyNote,
    Receipt,
    Map,
    LogOut,
    ChevronLeft,
    GraduationCap,
} from "lucide-react";

const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Courses", path: "/courses", icon: BookOpen },
    { name: "Notes", path: "/notes", icon: StickyNote },
    { name: "Purchases", path: "/purchase-history", icon: Receipt },
    { name: "Roadmaps", path: "/roadmap", icon: Map },
];

export default function DashboardSidebar({ collapsed, onToggle }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <aside
            className={`fixed left-0 top-0 h-full bg-white border-r border-surface-100 z-40
        transition-all duration-300 flex flex-col
        ${collapsed ? "w-[72px]" : "w-64"}`}
        >
            {/* Logo area */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-surface-100">
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-surface-900">
                            Elevate<span className="text-gradient">U</span>
                        </span>
                    </div>
                )}
                <button
                    onClick={onToggle}
                    className={`p-1.5 rounded-lg hover:bg-surface-100 transition-colors ${collapsed ? "mx-auto" : ""
                        }`}
                >
                    <ChevronLeft
                        className={`w-4 h-4 text-surface-400 transition-transform duration-300 ${collapsed ? "rotate-180" : ""
                            }`}
                    />
                </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {navItems.map(({ name, path, icon: Icon }) => (
                    <NavLink
                        key={name}
                        to={path}
                        end={path === "/dashboard"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
              ${isActive
                                ? "bg-primary-50 text-primary-600 shadow-sm"
                                : "text-surface-600 hover:bg-surface-50 hover:text-surface-900"
                            }
              ${collapsed ? "justify-center" : ""}`
                        }
                        title={collapsed ? name : undefined}
                    >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {!collapsed && <span>{name}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* User section */}
            <div className="border-t border-surface-100 p-3">
                {!collapsed ? (
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-surface-900 truncate">
                                {user?.name}
                            </p>
                            <p className="text-xs text-surface-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center py-2">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                    </div>
                )}
                <button
                    onClick={handleLogout}
                    className={`mt-2 flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors ${collapsed ? "justify-center" : ""
                        }`}
                    title={collapsed ? "Log Out" : undefined}
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span>Log Out</span>}
                </button>
            </div>
        </aside>
    );
}
