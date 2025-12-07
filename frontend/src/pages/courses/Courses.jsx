import { useEffect, useState } from "react";
import { getAllCourses } from "../../services/courseService";
import CourseCard from "../../components/CourseCard";
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

const NON_TECH_SUBCATEGORIES = [
  "Communication Skills",
  "Aptitude",
  "Finance for beginners",
  "HR Skills",
  "Business Analytics",
  "Management Skills",
];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  useEffect(() => {
    fetchCourses();
  }, [selectedCategory, selectedSubcategory, selectedLevel]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const filters = {};

      if (selectedCategory !== "All") filters.category = selectedCategory;
      if (selectedSubcategory !== "All") filters.subcategory = selectedSubcategory;
      if (selectedLevel !== "All") filters.level = selectedLevel;

      const response = await getAllCourses(filters);

      if (response.data && response.data.courses) {
        setCourses(response.data.courses);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const subcategories =
    selectedCategory === "Tech"
      ? TECH_SUBCATEGORIES
      : selectedCategory === "Non-Tech"
      ? NON_TECH_SUBCATEGORIES
      : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            Explore Courses
          </h1>
          <p className="text-gray-600 text-lg">
            Learn new skills from the best instructors
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory("All");
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Tech">Tech</option>
                <option value="Non-Tech">Non-Tech</option>
              </select>
            </div>

            {/* Subcategory Filter */}
            {selectedCategory !== "All" && (
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
                  {subcategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Level Filter */}
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

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedSubcategory("All");
                  setSelectedLevel("All");
                }}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600 text-lg">No courses found.</p>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Showing <span className="font-bold text-blue-600">{courses.length}</span> courses
          </p>
        </div>
      </div>
    </div>
  );
}
