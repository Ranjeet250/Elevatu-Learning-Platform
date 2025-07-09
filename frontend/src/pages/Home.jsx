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
    if (!interest) {
      toast.error("Please select your interest.");
      return;
    }

    const interestRoutes = {
      "Web Development": "/roadmap/web-development",
      "GEN'AI": "/roadmap/GEN'AI",
      Cybersecurity: "/roadmap/cybersecurity",
      "Data Analyst": "/roadmap/data-analyst",
      "Machine Learning": "/roadmap/machine-learning",
    };

    const route = interestRoutes[interest];

    if (route) {
      navigate(route);
    } else {
      toast.error("Selected roadmap is not available.");
    }
  };

  return (
    <div className="px-3 md:px-10 mt-10 space-y-16 ">
      {/* 🌟 Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-inner p-6">
        <div className="max-w-xl">
          <h1 className="text-5xl font-extrabold mb-4 text-blue-800 leading-tight">
            Build Your Career <br />{" "}
            <span className="text-blue-600">Smartly</span>
          </h1>
          <p className="text-gray-700 mb-6 text-lg">
            Choose your domain and we’ll guide you through the best learning
            path 🚀.
          </p>

          <div className="bg-white shadow p-6 rounded-lg space-y-4 border border-blue-100">
            <div>
              <label className="block mb-1 font-semibold text-gray-800">
                I'm interested in:
              </label>
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="" disabled hidden>
                  Select interest
                </option>
                <option>Web Development</option>
                <option>GEN'AI</option>
                <option>Cybersecurity</option>
                <option>Data Analyst</option>
                <option>Machine Learning</option>
              </select>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              onClick={handleShowRoadmap}
              disabled={loading}
            >
              {loading ? "Loading..." : "Show Roadmap"}
            </button>
          </div>
        </div>

        <img
          src={place}
          alt="Career illustration"
          className="w-full max-w-lg md:ml-10 mb-6 md:mb-0"
        />
      </section>

      {/* 🎯 Dashboard Section */}
      {user && (
        <section className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🎯 Dashboard
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            Welcome back,{" "}
            <strong className="text-blue-800">{user.user.name}</strong>!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/roadmap"
              className="bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 p-6 rounded-lg shadow text-center transition transform hover:-translate-y-1"
            >
              <h3 className="text-2xl font-semibold text-blue-800">
                🧭 Roadmaps
              </h3>
              <p className="text-sm text-gray-700 mt-2">
                Explore your learning journey
              </p>
            </Link>

            <Link
              to="/courses"
              className="bg-gradient-to-r from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 p-6 rounded-lg shadow text-center transition transform hover:-translate-y-1"
            >
              <h3 className="text-2xl font-semibold text-green-800">
                📚 Courses
              </h3>
              <p className="text-sm text-gray-700 mt-2">
                View available curated courses
              </p>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
