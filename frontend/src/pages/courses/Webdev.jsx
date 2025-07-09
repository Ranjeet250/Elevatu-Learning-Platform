import { FileDown, Youtube, BookOpenText } from "lucide-react";
import { motion } from "framer-motion";

export default function WebDevelopmentCourse() {
  const docs1 = [
    {
      title: "HTML Documentation",
      link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    {
      title: "CSS Documentation",
      link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    },
    {
      title: "JavaScript Documentation",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      title: "React Official Docs",
      link: "https://react.dev/learn",
    },
    {
      title: "Tailwind CSS Docs",
      link: "https://tailwindcss.com/docs",
    },
    {
      title: "Express.js Docs",
      link: "https://expressjs.com/",
    },
  ];

  const docs2 = [
    {
      title: "Node.js Documentation",
      link: "https://nodejs.org/en/docs",
    },
    {
      title: "MongoDB Docs",
      link: "https://www.mongodb.com/docs/",
    },
    {
      title: "Git Documentation",
      link: "https://git-scm.com/doc",
    },
    {
      title: "Vercel Deployment Docs",
      link: "https://vercel.com/docs",
    },
    {
      title: "Netlify Deployment Docs",
      link: "https://netlify.app/docs",
    },
    {
      title: "Web API Docs (MDN)",
      link: "https://developer.mozilla.org/en-US/docs/Web/API",
    },
  ];

  return (
    <div className="p-6 pt-24 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-10 text-center">
          🌐 Web Development Course
        </h1>

        {/* MDN Docs Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-2 mb-4">
            <BookOpenText /> MDN Documentation
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[docs1, docs2].map((list, i) => (
              <ul key={i} className="space-y-3">
                {list.map((doc, j) => (
                  <li
                    key={j}
                    className="bg-white border hover:border-blue-400 transition p-4 rounded-lg shadow-sm"
                  >
                    <a
                      href={doc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline text-sm font-medium"
                    >
                      📘 {doc.title}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>

        {/* YouTube Playlist Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-2 mb-4">
            <Youtube /> YouTube Playlist
          </h2>

          <div className="bg-white border border-blue-200 p-4 rounded-lg shadow-md">
            <a
              href="https://www.youtube.com/results?search_query=code+with+harry+web+dev+playlist+"
              target="_blank"
              className="text-blue-600 underline font-medium"
            >
              ▶️ Complete Web Dev Playlist by CodeWithHarry
            </a>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            💰 Course Price
          </h2>
          <div className="bg-green-100 border border-green-300 text-green-800 font-semibold rounded-lg p-4 w-fit">
            Free
          </div>
        </section>

        {/* PDF & Track Progress */}
        <section className="space-y-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-blue-600" />
            <span className="text-sm text-gray-700 font-medium">
              Track my progress
            </span>
          </label>
        </section>
      </div>
    </div>
  );
}
