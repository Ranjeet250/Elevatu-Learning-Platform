import { Link } from "react-router-dom";
import { Star, Users, Clock, BookOpen } from "lucide-react";

export default function CourseCard({ course }) {
  const {
    _id,
    title,
    description,
    thumbnail,
    price,
    level,
    category,
    subcategory,
    rating,
    enrolledStudents,
    duration,
    totalModules,
  } = course;

  const levelColor = {
    Beginner: "bg-accent-100 text-accent-700",
    Intermediate: "bg-amber-100 text-amber-700",
    Advanced: "bg-red-100 text-red-700",
  };

  return (
    <Link to={`/courses/${_id}`} className="card-hover group overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-white/60" />
          </div>
        )}

        {/* Price badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm text-sm font-bold text-surface-900 shadow-sm">
            {price === 0 ? "Free" : `₹${price}`}
          </span>
        </div>

        {/* Level badge */}
        <div className="absolute top-3 left-3">
          <span className={`badge ${levelColor[level] || "bg-surface-100 text-surface-600"}`}>
            {level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Category */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-primary-600 uppercase tracking-wider">
            {subcategory || category}
          </span>
        </div>

        <h3 className="font-semibold text-surface-900 text-base mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-surface-500 line-clamp-2 mb-4 flex-1">
          {description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-surface-400 pt-4 border-t border-surface-100">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {enrolledStudents?.length || 0} enrolled
          </span>
          {duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {duration}
            </span>
          )}
          {rating > 0 && (
            <span className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
