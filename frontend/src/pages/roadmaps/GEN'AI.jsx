import { motion } from "framer-motion";

export default function AIML() {
  const steps = [
    {
      title: "Python Programming",
      link: "https://docs.python.org/3/tutorial/",
    },
    {
      title: "Data Preparation & Analysis (NumPy, Pandas)",
      link: "https://www.kaggle.com/learn/pandas",
    },
    {
      title: "Intro to ML for GenAI (Transformers, Embeddings)",
      link: "https://developers.google.com/machine-learning/crash-course",
    },
    {
      title: "Foundation Models (GPT, LLaMA, BERT)",
      link: "https://huggingface.co/learn/nlp-course/chapter1",
    },
    {
      title: "Model Fine-Tuning & Prompting (LangChain, PEFT)",
      link: "https://github.com/dair-ai/Prompt-Engineering-Guide",
    },
    {
      title: "Deploy GenAI Apps (Gradio, Streamlit, FastAPI)",
      link: "https://www.gradio.app/guides/quickstart",
    },
  ];

  return (
    <div className="p-6 pt-10 bg-gradient-to-br from-purple-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-12">
        🤖 Generative AI Roadmap
      </h1>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-600"></div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center justify-between relative ${
                index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="md:w-1/2 p-4 z-10">
                <div className="bg-white border border-purple-300 shadow-lg p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">
                    Step {index + 1}: {step.title}
                  </h3>
                  <a
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500 underline hover:text-purple-700 text-sm"
                  >
                    📘 View Resource
                  </a>
                </div>
              </div>

              {/* Dot aligned with content */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-600 rounded-full border-4 border-white z-20" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
