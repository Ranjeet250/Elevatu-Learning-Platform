import { motion } from "framer-motion";
import { Code, BarChart, Layers, Brain, UploadCloud, Zap } from "lucide-react";

export default function MachineLearning() {
  const steps = [
    {
      title: "Python Fundamentals",
      icon: <Code className="text-yellow-600" />,
      link: "https://docs.python.org/3/tutorial/",
    },
    {
      title: "Data Preprocessing & EDA",
      icon: <BarChart className="text-yellow-600" />,
      link: "https://www.kaggle.com/learn/data-cleaning",
    },
    {
      title: "Supervised & Unsupervised ML",
      icon: <Layers className="text-yellow-600" />,
      link: "https://scikit-learn.org/stable/supervised_learning.html",
    },
    {
      title: "Deep Learning (NNs, CNNs, RNNs)",
      icon: <Brain className="text-yellow-600" />,
      link: "https://www.tensorflow.org/learn",
    },
    {
      title: "Model Deployment (Flask, FastAPI)",
      icon: <UploadCloud className="text-yellow-600" />,
      link: "https://fastapi.tiangolo.com/deployment/",
    },
    {
      title: "Projects & Real-world Practice",
      icon: <Zap className="text-yellow-600" />,
      link: "https://www.kaggle.com/competitions",
    },
  ];

  return (
    <div className="p-6 pt-20 bg-gradient-to-br from-yellow-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-center text-yellow-700 mb-16">
        🤖 Machine Learning Roadmap
      </h1>

      <div className="relative mx-auto max-w-6xl">
        {/* Vertical Timeline Line */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 1.5 }}
          className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-yellow-600 z-0"
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
                  {/* Left Block */}
                  <div className="col-span-4 flex justify-end pr-4">
                    <div className="bg-white w-full max-w-md border border-yellow-200 shadow-lg p-6 rounded-xl text-right">
                      <div className="flex items-center justify-end gap-2 mb-2">
                        <span className="text-yellow-700 font-semibold text-lg">
                          Step {index + 1}
                        </span>
                        {step.icon}
                      </div>
                      <h3 className="text-md font-semibold text-yellow-800 mb-1">
                        {step.title}
                      </h3>
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-500 underline hover:text-yellow-700 text-sm"
                      >
                        📘 View Resource
                      </a>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="col-span-1 flex justify-center">
                    <div className="w-5 h-5 bg-yellow-600 rounded-full border-4 border-white shadow-lg z-10" />
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
                    <div className="w-5 h-5 bg-yellow-600 rounded-full border-4 border-white shadow-lg z-10" />
                  </div>

                  {/* Right Block */}
                  <div className="col-span-4 flex justify-start pl-4">
                    <div className="bg-white w-full max-w-md border border-yellow-200 shadow-lg p-6 rounded-xl text-left">
                      <div className="flex items-center gap-2 mb-2">
                        {step.icon}
                        <span className="text-yellow-700 font-semibold text-lg">
                          Step {index + 1}
                        </span>
                      </div>
                      <h3 className="text-md font-semibold text-yellow-800 mb-1">
                        {step.title}
                      </h3>
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-500 underline hover:text-yellow-700 text-sm"
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
