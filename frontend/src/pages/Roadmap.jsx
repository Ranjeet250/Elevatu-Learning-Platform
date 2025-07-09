import { Link } from "react-router-dom";

const roadmapData = [
  {
    title: "Web Development",
    icon: "💻",
    color: "bg-blue-100 hover:bg-blue-200",
    path: "/roadmap/web-development",
  },
  {
    title: "GEN'AI",
    icon: "🤖",
    color: "bg-purple-100 hover:bg-purple-200",
    path: "/roadmap/GEN'AI",
  },
  {
    title: "Cybersecurity",
    icon: "🛡️",
    color: "bg-red-100 hover:bg-red-200",
    path: "/roadmap/cybersecurity",
  },
  {
    title: "Data Analyst",
    icon: "📊",
    color: "bg-yellow-100 hover:bg-yellow-200",
    path: "/roadmap/data-analyst",
  },
  {
    title: "Machine Learning",
    icon: "📈",
    color: "bg-green-100 hover:bg-green-200",
    path: "/roadmap/machine-learning",
  },
];

export default function Roadmap() {
  return (
    <div className="max-w-6xl mx-auto pt-4">
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-700">
        Choose a Roadmap
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmapData.map(({ title, icon, color, path }) => (
          <Link
            key={title}
            to={path}
            className={`${color} transition p-6 rounded-xl shadow text-center`}
          >
            <div className="text-5xl mb-4">{icon}</div>
            <h2 className="text-xl font-semibold">{title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
