import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { useState } from "react";
import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Roadmaps", path: "/roadmap" },
    { name: "Courses", path: "/courses" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 py-3">
        {/* 🔰 Logo with Text Overlay */}
        <Link to="/" className="relative flex items-center w-[140px] h-[80px]">
          {/* <img
            src={logo}
            alt="Logo"
            className="absolute inset-0 w-full h-full object-contain filter  opacity-60 bg-white"
          /> */}
          <span className="relative z-10 text-xl font-bold text-blue-800 ml-2">
            ElevateU
          </span>
        </Link>

        {/* 🌐 Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {user ? (
            <button
              onClick={logout}
              className="text-m bg-red-100 text-red-600 px-4 py-1 rounded hover:bg-red-200 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm border border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-50 transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* 📱 Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 📱 Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          {user ? (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="block w-full text-left text-red-600 py-2"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-blue-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
