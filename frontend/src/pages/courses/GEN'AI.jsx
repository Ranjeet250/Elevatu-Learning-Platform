export default function AIMLCourse() {
  const docs = [
    {
      name: "Prompt Engineering Guide (OpenAI)",
      link: "https://platform.openai.com/docs/guides/prompt-engineering",
    },
    {
      name: "LangChain Documentation",
      link: "https://docs.langchain.com/docs/",
    },
    {
      name: "Hugging Face Transformers",
      link: "https://huggingface.co/docs/transformers/index",
    },
    {
      name: "OpenAI API Docs",
      link: "https://platform.openai.com/docs/introduction",
    },
    {
      name: "Streamlit (for AI App UI)",
      link: "https://docs.streamlit.io/",
    },
    {
      name: "Gradio (Build ML Demos)",
      link: "https://www.gradio.app/docs/",
    },
  ];

  return (
    <div className="p-6 pt-24 min-h-screen bg-gradient-to-br from-violet-50 to-white">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">
        🧠 Gen AI Course
      </h1>

      {/* Docs */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          📘 Key Documentation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {docs.map((doc, idx) => (
            <a
              key={idx}
              href={doc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-white border border-purple-200 shadow hover:shadow-md rounded-lg hover:border-purple-400 transition text-purple-700 font-medium"
            >
              🔗 {doc.name}
            </a>
          ))}
        </div>
      </section>

      {/* YouTube Playlist */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-purple-700 mb-2">
          🎥 YouTube Playlist
        </h2>
        <a
          href="https://www.youtube.com/playlist?list=PLKnIA16_Rmvbr7zKYQuBfsVkjoLcJgxHH"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 underline text-lg hover:text-red-700 transition"
        >
          Build Gen AI Projects with LangChain, OpenAI, and Streamlit
        </a>
      </section>

      {/* Course Price */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-purple-700 mb-2">
          💰 Course Price
        </h2>
        <p className="text-green-700 text-lg font-bold">
          ₹1499 (Limited Offer)
        </p>
      </section>

      {/* Optional: Track Progress & Download */}
      <div className="flex gap-4 flex-wrap mt-6">
        <button className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
          📥 Download Course PDF
        </button>
        <button className="px-6 py-2 bg-gray-100 text-purple-700 border border-purple-400 rounded hover:bg-purple-200 transition">
          ✅ Track Progress
        </button>
      </div>
    </div>
  );
}
