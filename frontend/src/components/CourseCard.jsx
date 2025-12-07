import { Link } from "react-router-dom";

export default function CourseCard({ course, isAdmin = false, onDelete = null, onEdit = null }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-4xl">
            {course.category === "Tech" ? "Code" : "Learn"}
          </div>
        )}
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
          {course.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {course.description}
        </p>

        {/* Metadata */}
        <div className="flex gap-2 mb-3 flex-wrap">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded capitalize">
            {course.level}
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
            {course.subcategory}
          </span>
        </div>

        {/* Price */}
        <div className="text-lg font-bold text-green-600 mb-3">
          {course.price === 0 ? "Free" : `$${course.price}`}
        </div>

        {/* Tags */}
        {course.tags && course.tags.length > 0 && (
          <div className="flex gap-1 mb-3 flex-wrap">
            {course.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {tag}
              </span>
            ))}
            {course.tags.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                +{course.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Button */}
        <div className="mt-auto">
          {isAdmin ? (
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(course._id)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(course._id)}
                className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          ) : (
            <Link
              to={`/courses/${course._id}`}
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-center"
            >
              View Course
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
