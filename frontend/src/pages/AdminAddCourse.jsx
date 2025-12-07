import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createCourse } from "../services/courseService";
import AdminSidebar from "../components/AdminSidebar";
import { useAuth } from "../context/Authcontext";

export default function AdminAddCourse() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    level: "beginner",
    price: 0,
    tags: "",
    videoUrl: "",
    pdfLinks: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    setLoading(true);

    try {
      const courseData = {
        title: form.title,
        description: form.description,
        level: form.level,
        price: parseFloat(form.price) || 0,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        videoUrl: form.videoUrl,
        pdfLinks: form.pdfLinks
          .split(",")
          .map((link) => link.trim())
          .filter((link) => link),
        image: form.image,
      };

      console.log("Creating course with data:", courseData);
      
      const response = await createCourse(courseData);
      
      console.log("Course created successfully:", response.data);
      toast.success("Course created successfully!");
      
      // Wait 1 second then navigate to dashboard
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
      
    } catch (error) {
      console.error("Error creating course:", error);
      const errorMsg = error.response?.data?.message || "Failed to create course";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
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
            <button
              onClick={() => navigate("/admin")}
              className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2"
            >
              Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Add New Course</h1>
            <p className="text-gray-600 mt-2">
              Fill in the details to create a new course
            </p>
          </div>

          <div className="max-w-2xl bg-white rounded-lg shadow p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g., Advanced React.js"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Detailed course description..."
                  rows="4"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              {/* Level */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Level
                </label>
                <select
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="99.99"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="e.g., javascript, react, web-dev"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  value={form.videoUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/video.mp4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* PDF Links */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  PDF Links (comma-separated)
                </label>
                <input
                  type="text"
                  name="pdfLinks"
                  value={form.pdfLinks}
                  onChange={handleChange}
                  placeholder="https://example.com/pdf1.pdf, https://example.com/pdf2.pdf"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Course"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin")}
                  className="flex-1 px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
