import { useEffect, useState } from "react";
import { getAllCourses } from "../../services/courseService";
import CourseCard from "../../components/CourseCard";
import { toast } from "react-toastify";
import { Search, SlidersHorizontal, X, BookOpen } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, [selectedCategory, selectedSubcategory, selectedLevel]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (selectedCategory !== "All") filters.category = selectedCategory;
      if (selectedSubcategory !== "All")
        filters.subcategory = selectedSubcategory;
      if (selectedLevel !== "All") filters.level = selectedLevel;

      const response = await getAllCourses(filters);
      setCourses(response.data?.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const subcategories =
    selectedCategory === "Tech"
      ? TECH_SUBCATEGORIES
      : selectedCategory === "Non-Tech"
        ? NON_TECH_SUBCATEGORIES
        : [];

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedSubcategory !== "All" ||
    selectedLevel !== "All";

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedSubcategory("All");
    setSelectedLevel("All");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-surface-50 py-10">
      <div className="section-container">
        {/* Header */}
        <div className="mb-10 animate-fadeIn">
          <h1 className="section-heading mb-2">Explore Courses</h1>
          <p className="section-subheading">
            Discover expert-led courses to level up your skills
          </p>
        </div>

        {/* Search + Filter Bar */}
        <div className="card p-4 mb-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field !pl-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn-ghost flex items-center gap-2 border rounded-xl px-4 ${hasActiveFilters
                  ? "border-primary-300 bg-primary-50 text-primary-600"
                  : "border-surface-200"
                }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
                  {[selectedCategory, selectedSubcategory, selectedLevel].filter(
                    (v) => v !== "All"
                  ).length}
                </span>
              )}
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-surface-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
              <div>
                <label className="block text-xs font-medium text-surface-500 mb-1.5 uppercase tracking-wider">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubcategory("All");
                  }}
                  className="input-field !py-2.5 text-sm"
                >
                  <option value="All">All Categories</option>
                  <option value="Tech">Tech</option>
                  <option value="Non-Tech">Non-Tech</option>
                </select>
              </div>

              {selectedCategory !== "All" && (
                <div>
                  <label className="block text-xs font-medium text-surface-500 mb-1.5 uppercase tracking-wider">
                    Subcategory
                  </label>
                  <select
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="input-field !py-2.5 text-sm"
                  >
                    <option value="All">All</option>
                    {subcategories.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-surface-500 mb-1.5 uppercase tracking-wider">
                  Level
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="input-field !py-2.5 text-sm"
                >
                  <option value="All">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="btn-ghost text-sm w-full border border-surface-200 rounded-xl !py-2.5"
                >
                  Reset All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-surface-500">
            Showing{" "}
            <span className="font-semibold text-surface-800">
              {filteredCourses.length}
            </span>{" "}
            {filteredCourses.length === 1 ? "course" : "courses"}
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card overflow-hidden animate-pulse">
                <div className="h-44 bg-surface-200" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-surface-200 rounded w-1/3" />
                  <div className="h-5 bg-surface-200 rounded w-3/4" />
                  <div className="h-3 bg-surface-200 rounded w-full" />
                  <div className="h-3 bg-surface-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="card text-center py-16">
            <BookOpen className="w-12 h-12 text-surface-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-surface-700 mb-2">
              No courses found
            </h3>
            <p className="text-surface-500 mb-6">
              Try adjusting your search or filters
            </p>
            <button onClick={resetFilters} className="btn-secondary text-sm">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
