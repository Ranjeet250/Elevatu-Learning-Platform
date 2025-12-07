export default function CourseList({ courses, onDelete, onEdit }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Title
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Level
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Price
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Tags
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {courses.map((course) => (
            <tr key={course._id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <p className="font-medium text-gray-900">{course.title}</p>
                <p className="text-sm text-gray-600 truncate max-w-xs">
                  {course.description}
                </p>
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                  {course.level}
                </span>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900">
                ${course.price}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-1 flex-wrap">
                  {course.tags?.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {course.tags?.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{course.tags.length - 2}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(course._id)}
                    className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(course._id)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
