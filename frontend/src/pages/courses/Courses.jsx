// src/pages/courses/Courses.jsx
import { Link } from "react-router-dom";

export default function Courses() {
  const courseList = [
    {
      title: "Web Development",
      icon: "🌐",
      path: "/courses/webdev",
      color: "from-indigo-500 to-purple-500",
      description:
        "Master HTML, CSS, JavaScript, React, and Node.js to build modern websites and full-stack applications.",
    },
    {
      title: "GEN'AI",
      icon: "🤖",
      path: "/courses/GEN'AI",
      color: "from-pink-500 to-red-500",
      description:
        "Learn Python, data handling, machine learning, and deep learning with hands-on projects and real-world datasets.",
    },
    {
      title: "Cybersecurity",
      icon: "🛡️",
      path: "/courses/cybersecurity",
      color: "from-red-600 to-orange-400",
      description:
        "Understand network security, ethical hacking, cryptography, and tools like Wireshark, Burp Suite, and more.",
    },
    {
      title: "Data Analyst",
      icon: "📊",
      path: "/courses/DA",
      color: "from-green-500 to-teal-400",
      description:
        "Analyze and visualize data using Excel, SQL, Python, and BI tools like Power BI and Tableau.",
    },
    {
      title: "Machine Learning",
      icon: "🧠",
      path: "/courses/ML",
      color: "from-yellow-400 to-amber-500",
      description:
        "Dive deep into supervised/unsupervised learning, model tuning, deep learning, and ML pipelines.",
    },
  ];

  return (
    <div className="min-h-screen py-2 px-2 md:px-20 bg-gradient-to-br from-gray-50 to-white ">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-800 mb-16">
        📚 Explore Our Courses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {courseList.map((course) => (
          <div
            key={course.title}
            className="bg-white border border-gray-200 rounded-3xl shadow-xl hover:shadow-2xl transform transition hover:-translate-y-1 flex flex-col justify-between p-6"
          >
            <div
              className={`bg-gradient-to-tr ${course.color} text-white rounded-2xl p-6 flex flex-col items-center justify-center h-56`}
            >
              <div className="text-5xl mb-3 drop-shadow-lg">{course.icon}</div>
              <h2 className="text-xl font-bold text-center leading-snug">
                {course.title}
              </h2>
            </div>

            <p className="text-gray-700 text-sm mt-4 flex-grow">
              {course.description}
            </p>

            <Link
              to={course.path}
              className="mt-6 inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
            >
              View Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
