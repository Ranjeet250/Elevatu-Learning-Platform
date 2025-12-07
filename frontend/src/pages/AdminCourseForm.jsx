import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse, publishCourse } from "../services/courseService";
import { toast } from "react-toastify";
import AdminSidebar from "../components/AdminSidebar";
import { useAuth } from "../context/Authcontext";

const CATEGORIES = [
  { value: "Tech", label: "Tech" },
  { value: "Non-Tech", label: "Non-Tech" },
];

const TECH_SUBCATEGORIES = [
  "Web Development",
  "AI / ML",
  "Cybersecurity",
  "Data Analytics",
  "DevOps",
  "Cloud",
  "Blockchain",
  "Mobile App Development",
];

const NON_TECH_SUBCATEGORIES = [
  "Communication Skills",
  "Aptitude",
  "Finance for beginners",
  "HR Skills",
  "Business Analytics",
  "Management Skills",
];

const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export default function AdminCourseForm() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnail: "",
    price: 0,
    level: "Beginner",
    category: "Tech",
    subcategory: "Web Development",
    tags: "",
    videoPlaylistLinks: [],
    documentationLinks: [],
    roadmapSteps: [],
  });

  const [videoInput, setVideoInput] = useState({ title: "", url: "" });
  const [docInput, setDocInput] = useState({ title: "", url: "" });
  const [roadmapInput, setRoadmapInput] = useState({
    stepNumber: 1,
    title: "",
    description: "",
    resources: "",
    duration: "1 week",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addVideo = () => {
    if (videoInput.title && videoInput.url) {
      setForm({
        ...form,
        videoPlaylistLinks: [...form.videoPlaylistLinks, { ...videoInput }],
      });
      setVideoInput({ title: "", url: "" });
      toast.success("Video added!");
    }
  };

  const addDoc = () => {
    if (docInput.title && docInput.url) {
      setForm({
        ...form,
        documentationLinks: [...form.documentationLinks, { ...docInput }],
      });
      setDocInput({ title: "", url: "" });
      toast.success("Documentation added!");
    }
  };

  const addRoadmapStep = () => {
    if (roadmapInput.title && roadmapInput.description) {
      const resources = roadmapInput.resources
        .split(",")
        .map((r) => r.trim())
        .filter((r) => r);

      setForm({
        ...form,
        roadmapSteps: [
          ...form.roadmapSteps,
          {
            stepNumber: roadmapInput.stepNumber,
            title: roadmapInput.title,
            description: roadmapInput.description,
            resources,
            duration: roadmapInput.duration,
          },
        ],
      });
      setRoadmapInput({
        stepNumber: roadmapInput.stepNumber + 1,
        title: "",
        description: "",
        resources: "",
        duration: "1 week",
      });
      toast.success("Step added!");
    }
  };

  const removeVideo = (idx) => {
    setForm({
      ...form,
      videoPlaylistLinks: form.videoPlaylistLinks.filter((_, i) => i !== idx),
    });
  };

  const removeDoc = (idx) => {
    setForm({
      ...form,
      documentationLinks: form.documentationLinks.filter((_, i) => i !== idx),
    });
  };

  const removeRoadmapStep = (idx) => {
    setForm({
      ...form,
      roadmapSteps: form.roadmapSteps.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Course title is required");
      return;
    }
    if (!form.description.trim()) {
      toast.error("Course description is required");
      return;
    }

    setLoading(true);

    try {
      const courseData = {
        title: form.title.trim(),
        description: form.description.trim(),
        thumbnail: form.thumbnail || "https://via.placeholder.com/400x300?text=Course",
        price: parseFloat(form.price) || 0,
        level: form.level,
        category: form.category,
        subcategory: form.subcategory,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        videoPlaylistLinks: form.videoPlaylistLinks,
        documentationLinks: form.documentationLinks,
        roadmapSteps: form.roadmapSteps,
      };

      console.log("Creating course:", courseData);

      const response = await createCourse(courseData);
      console.log("Course created:", response);

      toast.success("Course created and published successfully!");
      navigate("/admin/courses");
    } catch (error) {
      console.error("Error creating course:", error);
      const errorMsg = error.response?.data?.message || error.message || "Failed to create course";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };

  const subcategories =
    form.category === "Tech" ? TECH_SUBCATEGORIES : NON_TECH_SUBCATEGORIES;

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar user={user} onLogout={handleLogout} />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <button
            onClick={() => navigate("/admin/courses")}
            className="mb-6 text-blue-600 hover:text-blue-800 font-semibold"
          >
            Back to Courses
          </button>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Course</h1>
          <p className="text-gray-600 mb-8">Add course details. Only title and description are required.</p>

          <form onSubmit={handleSubmit} className="max-w-4xl bg-white rounded-lg shadow-lg p-8 space-y-6">
            {/* SECTION 1: BASIC INFO */}
            <div className="border-l-4 border-blue-600 pl-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Basic Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Course Title * (Required)
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g., Advanced Web Development"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description * (Required)
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Detailed course description..."
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Level</label>
                    <select
                      name="level"
                      value={form.level}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      {LEVELS.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Thumbnail URL</label>
                  <input
                    type="url"
                    name="thumbnail"
                    value={form.thumbnail}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  {form.thumbnail && (
                    <img src={form.thumbnail} alt="preview" className="mt-2 w-20 h-20 rounded object-cover" />
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2: CATEGORIZATION */}
            <div className="border-l-4 border-green-600 pl-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Categorization</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        category: e.target.value,
                        subcategory:
                          e.target.value === "Tech" ? TECH_SUBCATEGORIES[0] : NON_TECH_SUBCATEGORIES[0],
                      });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subcategory</label>
                  <select
                    name="subcategory"
                    value={form.subcategory}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  >
                    {subcategories.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 mt-4">Tags (Optional)</label>
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="javascript, react, web-dev"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            </div>

            {/* SECTION 3: VIDEO PLAYLISTS */}
            <div className="border-l-4 border-purple-600 pl-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Video Playlists (Optional)</h2>
              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Video Title"
                    value={videoInput.title}
                    onChange={(e) => setVideoInput({ ...videoInput, title: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                  <input
                    type="url"
                    placeholder="Video URL"
                    value={videoInput.url}
                    onChange={(e) => setVideoInput({ ...videoInput, url: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={addVideo}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                >
                  Add Video
                </button>
              </div>

              {form.videoPlaylistLinks.length > 0 && (
                <div className="space-y-2">
                  {form.videoPlaylistLinks.map((video, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-purple-50 p-3 rounded">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{video.title}</p>
                        <p className="text-sm text-gray-600 truncate">{video.url}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeVideo(idx)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SECTION 4: DOCUMENTATION */}
            <div className="border-l-4 border-orange-600 pl-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Documentation Links (Optional)</h2>
              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Doc Title"
                    value={docInput.title}
                    onChange={(e) => setDocInput({ ...docInput, title: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  <input
                    type="url"
                    placeholder="Doc URL"
                    value={docInput.url}
                    onChange={(e) => setDocInput({ ...docInput, url: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={addDoc}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm"
                >
                  Add Documentation
                </button>
              </div>

              {form.documentationLinks.length > 0 && (
                <div className="space-y-2">
                  {form.documentationLinks.map((doc, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-orange-50 p-3 rounded">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{doc.title}</p>
                        <p className="text-sm text-gray-600 truncate">{doc.url}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDoc(idx)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SECTION 5: ROADMAP STEPS */}
            <div className="border-l-4 border-red-600 pl-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Learning Roadmap (Optional)</h2>
              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  placeholder="Step Title"
                  value={roadmapInput.title}
                  onChange={(e) => setRoadmapInput({ ...roadmapInput, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                />
                <textarea
                  placeholder="Step Description"
                  value={roadmapInput.description}
                  onChange={(e) => setRoadmapInput({ ...roadmapInput, description: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none resize-none"
                />
                <input
                  type="text"
                  placeholder="Resources (comma-separated)"
                  value={roadmapInput.resources}
                  onChange={(e) => setRoadmapInput({ ...roadmapInput, resources: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Duration (e.g., 1 week)"
                  value={roadmapInput.duration}
                  onChange={(e) => setRoadmapInput({ ...roadmapInput, duration: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                />
                <button
                  type="button"
                  onClick={addRoadmapStep}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                >
                  Add Step ({form.roadmapSteps.length} added)
                </button>
              </div>

              {form.roadmapSteps.length > 0 && (
                <div className="space-y-3">
                  {form.roadmapSteps.map((step, idx) => (
                    <div key={idx} className="bg-red-50 p-4 rounded border-l-4 border-red-600">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">Step {step.stepNumber}: {step.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                          <p className="text-xs text-gray-500 mt-2">Duration: {step.duration}</p>
                          {step.resources.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {step.resources.map((resource, ridx) => (
                                <span
                                  key={ridx}
                                  className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs"
                                >
                                  {resource}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeRoadmapStep(idx)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SUBMIT BUTTONS */}
            <div className="border-t pt-6 flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create & Publish Course"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/courses")}
                className="flex-1 px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
