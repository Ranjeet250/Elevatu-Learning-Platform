import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById, enrollCourse } from "../services/courseService";
import { useAuth } from "../context/Authcontext";
import { toast } from "react-toastify";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

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
        response.data.course.enrolledStudents.some((s) => s._id === user.id)
      ) {
        setIsEnrolled(true);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
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
    navigate("/courses/${id}/enroll");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/courses")}
          className="mb-6 text-blue-600 hover:text-blue-800 font-semibold"
        >
          Back to Courses
        </button>

        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="h-96 bg-gradient-to-r from-blue-500 to-purple-600 relative">
            {course.thumbnail ? (
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-6xl">
                {course.category === "Tech" ? "Code" : "Learn"}
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {course.title}
                </h1>
                <p className="text-gray-600 text-lg mb-4">
                  {course.description}
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-green-600">
                  {course.price === 0 ? "Free" : `$${course.price}`}
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded">
                <p className="text-gray-600 text-sm">Level</p>
                <p className="font-bold text-blue-600">{course.level}</p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <p className="text-gray-600 text-sm">Category</p>
                <p className="font-bold text-green-600">{course.category}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded">
                <p className="text-gray-600 text-sm">Subcategory</p>
                <p className="font-bold text-purple-600">
                  {course.subcategory}
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded">
                <p className="text-gray-600 text-sm">Students</p>
                <p className="font-bold text-orange-600">
                  {course.enrolledStudents.length}
                </p>
              </div>
            </div>

            {/* Enroll Button */}
            <button
              onClick={handleEnroll}
              disabled={isEnrolled}
              className={`w-full py-3 rounded-lg font-bold text-lg transition ${
                isEnrolled
                  ? "bg-green-600 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Videos Section */}
            {course.videoPlaylistLinks &&
              course.videoPlaylistLinks.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Video Playlists
                  </h2>
                  <div className="space-y-3">
                    {course.videoPlaylistLinks.map((video, idx) => (
                      <a
                        key={idx}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                      >
                        <p className="font-semibold text-blue-600">
                          {video.title}
                        </p>
                        <p className="text-sm text-gray-600">{video.url}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

            {/* Documentation Section */}
            {course.documentationLinks &&
              course.documentationLinks.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Documentation
                  </h2>
                  <div className="space-y-3">
                    {course.documentationLinks.map((doc, idx) => (
                      <a
                        key={idx}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition"
                      >
                        <p className="font-semibold text-green-600">
                          {doc.title}
                        </p>
                        <p className="text-sm text-gray-600">{doc.url}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

            {/* Roadmap Section */}
            {course.roadmapSteps && course.roadmapSteps.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Learning Roadmap
                </h2>
                <div className="space-y-4">
                  {course.roadmapSteps
                    .sort((a, b) => a.stepNumber - b.stepNumber)
                    .map((step, idx) => (
                      <div
                        key={idx}
                        className="border-l-4 border-blue-600 pl-4 py-2"
                      >
                        <h3 className="font-bold text-lg text-gray-800">
                          Step {step.stepNumber}: {step.title}
                        </h3>
                        <p className="text-gray-600 my-2">{step.description}</p>
                        <p className="text-sm text-gray-500">
                          Duration: {step.duration}
                        </p>
                        {step.resources && step.resources.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {step.resources.map((resource, ridx) => (
                              <span
                                key={ridx}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                              >
                                {resource}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Tags */}
            {course.tags && course.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h3 className="font-bold text-gray-800 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Instructor */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Instructor</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {course.instructor.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {course.instructor.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {course.instructor.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
