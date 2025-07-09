import { motion } from "framer-motion";
import {
  Code,
  GitBranch,
  MonitorSmartphone,
  Server,
  Database,
  Rocket,
} from "lucide-react";

export default function WebDevelopment() {
  const steps = [
    {
      title: "HTML, CSS, JavaScript",
      icon: <Code className="text-blue-600" />,
      link: "https://developer.mozilla.org/en-US/docs/Web/Guide",
    },
    {
      title: "Version Control (Git, GitHub)",
      icon: <GitBranch className="text-blue-600" />,
      link: "https://git-scm.com/doc",
    },
    {
      title: "Frontend Frameworks (React, Tailwind CSS)",
      icon: <MonitorSmartphone className="text-blue-600" />,
      link: "https://reactjs.org/docs/getting-started.html",
    },
    {
      title: "Backend (Node.js, Express)",
      icon: <Server className="text-blue-600" />,
      link: "https://expressjs.com/en/starter/installing.html",
    },
    {
      title: "Databases (MongoDB, PostgreSQL)",
      icon: <Database className="text-blue-600" />,
      link: "https://www.mongodb.com/docs/",
    },
    {
      title: "Deployment (Vercel, Netlify)",
      icon: <Rocket className="text-blue-600" />,
      link: "https://vercel.com/docs",
    },
  ];

  return (
    <div className="p-4 pt-20 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-16">
        🚀 Web Development Roadmap
      </h1>

      <div className="relative mx-auto max-w-6xl">
        {/* Vertical line */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-600 z-0"
          style={{ top: 0, bottom: 0 }}
        />

        {/* Timeline Steps */}
        <div className="space-y-16 relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-9 items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Left side (even steps) */}
              {index % 2 === 0 ? (
                <>
                  <div className="col-span-4 flex justify-end pr-4">
                    <div className="bg-white w-full max-w-md border border-blue-200 shadow-lg p-6 rounded-xl text-right">
                      <div className="flex items-center justify-end gap-2 mb-2">
                        <span className="text-blue-700 font-semibold text-lg">
                          Step {index + 1}
                        </span>
                        {step.icon}
                      </div>
                      <h3 className="text-md font-semibold text-blue-800 mb-1">
                        {step.title}
                      </h3>
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700 text-sm"
                      >
                        📘 View Resource
                      </a>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="col-span-1 flex justify-center">
                    <div className="w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10" />
                  </div>

                  {/* Spacer */}
                  <div className="col-span-4 hidden md:block" />
                </>
              ) : (
                <>
                  {/* Spacer */}
                  <div className="col-span-4 hidden md:block" />

                  {/* Dot */}
                  <div className="col-span-1 flex justify-center">
                    <div className="w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10" />
                  </div>

                  {/* Right side (odd steps) */}
                  <div className="col-span-4 flex justify-start pl-4">
                    <div className="bg-white w-full max-w-md border border-blue-200 shadow-lg p-6 rounded-xl text-left">
                      <div className="flex items-center gap-2 mb-2">
                        {step.icon}
                        <span className="text-blue-700 font-semibold text-lg">
                          Step {index + 1}
                        </span>
                      </div>
                      <h3 className="text-md font-semibold text-blue-800 mb-1">
                        {step.title}
                      </h3>
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700 text-sm"
                      >
                        📘 View Resource
                      </a>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
