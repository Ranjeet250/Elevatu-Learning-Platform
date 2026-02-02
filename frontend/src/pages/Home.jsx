import { useAuth } from "../context/Authcontext";
import { Link, useNavigate } from "react-router-dom";
import place from "../assets/placeholdernew.png";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [interest, setInterest] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShowRoadmap = () => {
    if (!interest) return toast.error("Please select your interest.");

    const routes = {
      "Web Development": "/roadmap/web-development",
      "GEN'AI": "/roadmap/GEN'AI",
      Cybersecurity: "/roadmap/cybersecurity",
      "Data Analyst": "/roadmap/data-analyst",
      "Machine Learning": "/roadmap/machine-learning",
    };

    const route = routes[interest];
    if (!route) return toast.error("Invalid selection");
    navigate(route);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-4 md:p-8">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between mb-12 space-y-6 md:space-y-0">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Welcome to <span className="text-blue-600">ElevateU</span>
          </h1>
          <p className="text-lg text-gray-700">
            Your complete learning platform for tech skills, roadmaps, and
            career guidance.
          </p>

          {/* Interest Selection */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">
              Choose Your Interest:
            </label>
            <div className="flex flex-col md:flex-row gap-3">
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an option</option>
                <option value="Web Development">Web Development</option>
                <option value="GEN'AI">GEN'AI</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Machine Learning">Machine Learning</option>
              </select>
              <button
                onClick={handleShowRoadmap}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Loading..." : "Show Roadmap"}
              </button>
            </div>
          </div>
        </div>

        <img
          src={place}
          alt="Career illustration"
          className="w-full max-w-lg md:ml-10 mb-6 md:mb-0"
        />
      </section>

      {/* Dashboard Section */}
      {user && (
        <section className="bg-white p-8 rounded-xl shadow-lg border border-blue-100 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h2>
          <p className="text-gray-600 mb-6 text-lg">
            Welcome back, <strong className="text-blue-800">{user.name}</strong>
            !
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Roadmaps */}
            <Link
              to="/roadmap"
              className="bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 p-6 rounded-lg shadow text-center transition transform hover:-translate-y-1"
            >
              <h3 className="text-2xl font-semibold text-blue-800">Roadmaps</h3>
              <p className="text-sm text-gray-700 mt-2">
                Explore your learning journey
              </p>
            </Link>

            {/* Courses */}
            <Link
              to="/courses"
              className="bg-gradient-to-r from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 p-6 rounded-lg shadow text-center transition transform hover:-translate-y-1"
            >
              <h3 className="text-2xl font-semibold text-green-800">Courses</h3>
              <p className="text-sm text-gray-700 mt-2">
                View available curated courses
              </p>
            </Link>

            {/* Admin Panel (if user is admin) */}
            {user.role === "admin" && (
              <Link
                to="/admin"
                className="bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 p-6 rounded-lg shadow text-center transition transform hover:-translate-y-1"
              >
                <h3 className="text-2xl font-semibold text-red-800">
                  Admin Panel
                </h3>
                <p className="text-sm text-gray-700 mt-2">
                  Manage your courses
                </p>
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Not Logged In Section */}
      {!user && (
        <section className="bg-white p-8 rounded-xl shadow-lg border border-blue-100 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to elevate your skills?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of learners on their journey to success
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              Register
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
