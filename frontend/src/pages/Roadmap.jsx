import { Link } from "react-router-dom";
import { Code2, Brain, Shield, BarChart3, Cpu, ArrowRight } from "lucide-react";

const roadmapData = [
  {
    title: "Web Development",
    desc: "Master HTML, CSS, JS, React & full-stack development",
    icon: Code2,
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
    path: "/roadmap/web-development",
  },
  {
    title: "GEN'AI",
    desc: "Explore generative AI, LLMs, prompt engineering & more",
    icon: Brain,
    color: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-50",
    path: "/roadmap/GEN'AI",
  },
  {
    title: "Cybersecurity",
    desc: "Learn ethical hacking, network security & threat analysis",
    icon: Shield,
    color: "from-red-500 to-rose-600",
    bgLight: "bg-red-50",
    path: "/roadmap/cybersecurity",
  },
  {
    title: "Data Analyst",
    desc: "Master SQL, Excel, Python, visualization & BI tools",
    icon: BarChart3,
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
    path: "/roadmap/data-analyst",
  },
  {
    title: "Machine Learning",
    desc: "Deep dive into ML algorithms, deep learning & deployment",
    icon: Cpu,
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
    path: "/roadmap/machine-learning",
  },
];

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-surface-50 py-16">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="section-heading mb-3">
            Career <span className="text-gradient">Roadmaps</span>
          </h1>
          <p className="section-subheading mx-auto">
            Follow structured, step-by-step learning paths designed by industry
            experts to guide your career journey.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {roadmapData.map(
            ({ title, desc, icon: Icon, color, bgLight, path }, i) => (
              <Link
                key={title}
                to={path}
                className="card-hover group p-6 animate-fadeIn flex flex-col"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h2 className="text-lg font-semibold text-surface-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {title}
                </h2>

                <p className="text-sm text-surface-500 leading-relaxed mb-5 flex-1">
                  {desc}
                </p>

                <div className="flex items-center text-sm font-medium text-primary-600 gap-1 group-hover:gap-2 transition-all">
                  View Roadmap
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
