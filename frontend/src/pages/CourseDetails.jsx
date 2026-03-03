import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCourseById, enrollCourse } from "../services/courseService";
import { useAuth } from "../context/Authcontext";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Star,
  Users,
  Clock,
  BookOpen,
  Play,
  FileText,
  ChevronDown,
  CheckCircle2,
  ShoppingCart,
} from "lucide-react";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await getCourseById(id);
      setCourse(response.data.course);
      if (
        user &&
        response.data.course.enrolledStudents?.some((s) => s._id === user.id || s === user.id)
      ) {
        setIsEnrolled(true);
      }
    } catch {
      toast.error("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = () => {
    if (!user) {
      toast.error("Please login to enroll");
      navigate("/login");
      return;
    }
    navigate(`/courses/${id}/enroll`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-50 py-12">
        <div className="section-container animate-pulse">
          <div className="h-80 bg-surface-200 rounded-2xl mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 bg-surface-200 rounded w-2/3" />
              <div className="h-4 bg-surface-200 rounded w-full" />
              <div className="h-4 bg-surface-200 rounded w-3/4" />
            </div>
            <div className="card p-6 space-y-4">
              <div className="h-10 bg-surface-200 rounded" />
              <div className="h-12 bg-surface-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-surface-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-surface-700 mb-2">
            Course not found
          </h2>
          <Link to="/courses" className="btn-primary text-sm mt-4 inline-block">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    ...(course.roadmapSteps?.length ? [{ id: "roadmap", label: "Roadmap" }] : []),
    ...(course.videoPlaylistLinks?.length ? [{ id: "videos", label: "Videos" }] : []),
    ...(course.documentationLinks?.length ? [{ id: "docs", label: "Resources" }] : []),
  ];

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Hero */}
      <div className="relative h-72 sm:h-80 overflow-hidden">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="section-container">
            <button
              onClick={() => navigate("/courses")}
              className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </button>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="badge bg-white/20 text-white backdrop-blur-sm">
                {course.category}
              </span>
              <span className="badge bg-white/20 text-white backdrop-blur-sm">
                {course.level}
              </span>
              {course.subcategory && (
                <span className="badge bg-white/20 text-white backdrop-blur-sm">
                  {course.subcategory}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              {course.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="section-container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Meta Bar */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-surface-500">
              {course.rating > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {course.rating.toFixed(1)}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {course.enrolledStudents?.length || 0} enrolled
              </span>
              {course.duration && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-surface-200 mb-6 overflow-x-auto">
              {tabs.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === id
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent text-surface-500 hover:text-surface-700"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="animate-fadeIn">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="card p-6">
                    <h2 className="text-lg font-semibold text-surface-900 mb-3">
                      About this course
                    </h2>
                    <p className="text-surface-600 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {course.tags?.length > 0 && (
                    <div className="card p-6">
                      <h3 className="text-lg font-semibold text-surface-900 mb-3">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {course.tags.map((tag, i) => (
                          <span key={i} className="badge-primary">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "roadmap" && course.roadmapSteps?.length > 0 && (
                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-surface-900 mb-6">
                    Learning Roadmap
                  </h2>
                  <div className="space-y-0">
                    {course.roadmapSteps
                      .sort((a, b) => a.stepNumber - b.stepNumber)
                      .map((step, i) => (
                        <div key={i} className="relative flex gap-4">
                          {/* Timeline */}
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold text-sm flex-shrink-0 z-10">
                              {step.stepNumber}
                            </div>
                            {i < course.roadmapSteps.length - 1 && (
                              <div className="w-0.5 flex-1 bg-primary-100 my-1" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="pb-8">
                            <h3 className="font-semibold text-surface-900 mb-1">
                              {step.title}
                            </h3>
                            <p className="text-sm text-surface-500 mb-2">
                              {step.description}
                            </p>
                            {step.duration && (
                              <span className="text-xs text-surface-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {step.duration}
                              </span>
                            )}
                            {step.resources?.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {step.resources.map((r, j) => (
                                  <span
                                    key={j}
                                    className="badge bg-surface-100 text-surface-600"
                                  >
                                    {r}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {activeTab === "videos" && course.videoPlaylistLinks?.length > 0 && (
                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-surface-900 mb-4">
                    Video Playlists
                  </h2>
                  <div className="space-y-3">
                    {course.videoPlaylistLinks.map((video, i) => (
                      <a
                        key={i}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl bg-surface-50 hover:bg-primary-50 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                          <Play className="w-4 h-4 text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-surface-900 text-sm">
                            {video.title}
                          </p>
                          <p className="text-xs text-surface-400 truncate">
                            {video.url}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "docs" && course.documentationLinks?.length > 0 && (
                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-surface-900 mb-4">
                    Documentation & Resources
                  </h2>
                  <div className="space-y-3">
                    {course.documentationLinks.map((doc, i) => (
                      <a
                        key={i}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl bg-surface-50 hover:bg-accent-50 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center group-hover:bg-accent-200 transition-colors">
                          <FileText className="w-4 h-4 text-accent-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-surface-900 text-sm">
                            {doc.title}
                          </p>
                          <p className="text-xs text-surface-400 truncate">
                            {doc.url}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24 space-y-6">
              {/* Price */}
              <div>
                <p className="text-3xl font-bold text-surface-900">
                  {course.price === 0 ? "Free" : `₹${course.price}`}
                </p>
              </div>

              {/* Enroll/Enrolled Button */}
              <button
                onClick={handleEnroll}
                disabled={isEnrolled}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${isEnrolled
                    ? "bg-accent-100 text-accent-700 cursor-default"
                    : "btn-primary"
                  }`}
              >
                {isEnrolled ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Enrolled
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    {course.price === 0 ? "Enroll Free" : "Buy Course"}
                  </>
                )}
              </button>

              {/* Course Info */}
              <div className="space-y-3 pt-4 border-t border-surface-100">
                {[
                  { label: "Level", value: course.level },
                  { label: "Category", value: course.category },
                  { label: "Subcategory", value: course.subcategory },
                  {
                    label: "Students",
                    value: course.enrolledStudents?.length || 0,
                  },
                  ...(course.duration
                    ? [{ label: "Duration", value: course.duration }]
                    : []),
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-surface-500">{label}</span>
                    <span className="font-medium text-surface-800">{value}</span>
                  </div>
                ))}
              </div>

              {/* Instructor */}
              {course.instructor && typeof course.instructor === "object" && (
                <div className="pt-4 border-t border-surface-100">
                  <p className="text-sm text-surface-500 mb-3">Instructor</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                      {course.instructor.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-surface-900">
                        {course.instructor.name}
                      </p>
                      <p className="text-xs text-surface-500">
                        {course.instructor.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
