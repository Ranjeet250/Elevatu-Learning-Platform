import { motion } from "framer-motion";
import { ShieldCheck, Terminal, Bug, Lock, Radar } from "lucide-react";

export default function Cybersecurity() {
  const steps = [
    {
      title: "Networking Fundamentals",
      icon: <Radar className="text-red-600" />,
      link: "https://www.geeksforgeeks.org/computer-network-tutorials/",
    },
    {
      title: "Linux & Windows Security",
      icon: <Terminal className="text-red-600" />,
      link: "https://www.cyberciti.biz/faq/linux-security/",
    },
    {
      title: "Penetration Testing (Kali Linux, Burp Suite)",
      icon: <Bug className="text-red-600" />,
      link: "https://portswigger.net/burp/documentation",
    },
    {
      title: "Cryptography Basics",
      icon: <Lock className="text-red-600" />,
      link: "https://cryptography.io/en/latest/",
    },
    {
      title: "SIEM Tools (Splunk, Wireshark)",
      icon: <ShieldCheck className="text-red-600" />,
      link: "https://www.wireshark.org/docs/wsug_html_chunked/",
    },
  ];

  return (
    <div className="p-6 pt-20 bg-gradient-to-br from-red-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-center text-red-700 mb-16">
        🛡️ Cybersecurity Roadmap
      </h1>

      <div className="relative mx-auto max-w-6xl">
        {/* Central vertical line */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 1.5 }}
          className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-600 z-0"
          style={{ top: 0, bottom: 0 }}
        />

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
              {index % 2 === 0 ? (
                <>
                  <div className="col-span-4 flex justify-end pr-4">
                    <div className="bg-white w-full max-w-md border border-red-200 shadow-lg p-6 rounded-xl text-right">
                      <div className="flex items-center justify-end gap-2 mb-2">
                        <span className="text-red-700 font-semibold text-lg">
                          Step {index + 1}
                        </span>
                        {step.icon}
                      </div>
                      <h3 className="text-md font-semibold text-red-800 mb-1">
                        {step.title}
                      </h3>
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-500 underline hover:text-red-700 text-sm"
                      >
                        📘 View Resource
                      </a>
                    </div>
                  </div>

                  <div className="col-span-1 flex justify-center">
                    <div className="w-5 h-5 bg-red-600 rounded-full border-4 border-white shadow-lg z-10" />
                  </div>

                  <div className="col-span-4 hidden md:block" />
                </>
              ) : (
                <>
                  <div className="col-span-4 hidden md:block" />

                  <div className="col-span-1 flex justify-center">
                    <div className="w-5 h-5 bg-red-600 rounded-full border-4 border-white shadow-lg z-10" />
                  </div>

                  <div className="col-span-4 flex justify-start pl-4">
                    <div className="bg-white w-full max-w-md border border-red-200 shadow-lg p-6 rounded-xl text-left">
                      <div className="flex items-center gap-2 mb-2">
                        {step.icon}
                        <span className="text-red-700 font-semibold text-lg">
                          Step {index + 1}
                        </span>
                      </div>
                      <h3 className="text-md font-semibold text-red-800 mb-1">
                        {step.title}
                      </h3>
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-500 underline hover:text-red-700 text-sm"
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
