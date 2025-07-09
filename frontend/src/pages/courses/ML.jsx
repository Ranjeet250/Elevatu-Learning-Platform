export default function MachineLearningCourse() {
  const docs = [
    {
      name: "Python for ML (W3Schools)",
      link: "https://www.w3schools.com/python/python_ml_getting_started.asp",
    },
    {
      name: "NumPy Documentation",
      link: "https://numpy.org/doc/",
    },
    {
      name: "Pandas Documentation",
      link: "https://pandas.pydata.org/docs/",
    },
    {
      name: "Scikit-Learn Docs",
      link: "https://scikit-learn.org/stable/documentation.html",
    },
    {
      name: "TensorFlow Guide",
      link: "https://www.tensorflow.org/learn",
    },
    {
      name: "PyTorch Docs",
      link: "https://pytorch.org/tutorials/",
    },
    {
      name: "ML Model Deployment (FastAPI)",
      link: "https://fastapi.tiangolo.com/tutorial/",
    },
    {
      name: "Google Colab",
      link: "https://colab.research.google.com/",
    },
  ];

  return (
    <div className="p-6 pt-24 min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-10">
        🤖 Machine Learning Course
      </h1>

      {/* Docs Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
          📘 Documentation & Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {docs.map((doc, idx) => (
            <a
              key={idx}
              href={doc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-white border border-indigo-200 shadow hover:shadow-md rounded-lg hover:border-indigo-400 transition text-indigo-800 font-medium"
            >
              🔗 {doc.name}
            </a>
          ))}
        </div>
      </section>

      {/* YouTube Playlist */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
          🎥 YouTube Playlist
        </h2>
        <a
          href="https://www.youtube.com/playlist?list=PLZoTAELRMXVMdJ5sqbCK2LiM0HhQVWNzm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 underline text-lg hover:text-indigo-800 transition"
        >
          ML Course by Krish Naik – YouTube Playlist
        </a>
      </section>

      {/* Pricing */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
          💰 Course Price
        </h2>
        <p className="text-indigo-800 text-lg font-bold">₹2499</p>
      </section>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap mt-6">
        <button className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
          📥 Download Course PDF
        </button>
        <button className="px-6 py-2 bg-white text-indigo-700 border border-indigo-500 rounded hover:bg-indigo-100 transition">
          ✅ Track Progress
        </button>
      </div>
    </div>
  );
}
