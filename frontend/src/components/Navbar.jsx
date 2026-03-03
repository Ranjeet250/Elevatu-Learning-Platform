import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  BookOpen,
  StickyNote,
  LogOut,
  User,
  GraduationCap,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Roadmaps", path: "/roadmap" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-soft border-b border-surface-100"
          : "bg-white/60 backdrop-blur-md"
        }`}
    >
      <div className="section-container flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center shadow-glow group-hover:shadow-lg transition-shadow duration-300">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-surface-900 tracking-tight">
            Elevate<span className="text-gradient">U</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                  ? "text-primary-600 bg-primary-50"
                  : "text-surface-600 hover:text-surface-900 hover:bg-surface-50"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right: Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-surface-50 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-surface-700 max-w-[100px] truncate">
                  {user.name}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-surface-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-elevated border border-surface-100 py-2 animate-fadeIn z-50">
                  <div className="px-4 py-3 border-b border-surface-100">
                    <p className="text-sm font-semibold text-surface-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-surface-500">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 hover:bg-surface-50 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <Link
                      to="/notes"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 hover:bg-surface-50 transition-colors"
                    >
                      <StickyNote className="w-4 h-4" />
                      My Notes
                    </Link>
                    <Link
                      to="/purchase-history"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 hover:bg-surface-50 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      Purchase History
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 hover:bg-surface-50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    )}
                  </div>
                  <div className="border-t border-surface-100 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-ghost text-sm">
                Log In
              </Link>
              <Link to="/register" className="btn-primary text-sm !py-2.5 !px-5">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-surface-50 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="w-5 h-5 text-surface-700" />
          ) : (
            <Menu className="w-5 h-5 text-surface-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-surface-100 animate-fadeIn">
          <div className="section-container py-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                    ? "bg-primary-50 text-primary-600"
                    : "text-surface-700 hover:bg-surface-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {user ? (
              <>
                <div className="border-t border-surface-100 my-2 pt-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-surface-700 hover:bg-surface-50"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <Link
                    to="/notes"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-surface-700 hover:bg-surface-50"
                  >
                    <StickyNote className="w-4 h-4" />
                    My Notes
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </>
            ) : (
              <div className="border-t border-surface-100 my-2 pt-3 flex gap-3 px-4">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="btn-secondary flex-1 text-center text-sm !py-2.5"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary flex-1 text-center text-sm !py-2.5"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
