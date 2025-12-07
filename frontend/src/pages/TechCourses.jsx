import { useEffect, useState } from "react";
import { getAllCourses } from "../services/courseService";
import CourseCard from "../components/CourseCard";
import { toast } from "react-toastify";

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

export default function TechCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, [selectedSubcategory, selectedLevel]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const filters = { category: "Tech" };

      if (selectedSubcategory !== "All") {
        filters.subcategory = selectedSubcategory;
      }
      if (selectedLevel !== "All") {
        filters.level = selectedLevel;
      }

      const response = await getAllCourses(filters);
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">Tech Courses</h1>
          <p className="text-gray-600 text-lg">Learn the latest technology skills</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subcategory
              </label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="All">All Subcategories</option>
                {TECH_SUBCATEGORIES.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedSubcategory("All");
                  setSelectedLevel("All");
                }}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Courses */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-600">No courses found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

