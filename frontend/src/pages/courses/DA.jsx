export default function DataAnalystCourse() {
  const docs = [
    {
      name: "Excel for Data Analysis",
      link: "https://support.microsoft.com/en-us/excel",
    },
    {
      name: "Google Sheets Guide",
      link: "https://support.google.com/docs/answer/9331169",
    },
    {
      name: "SQL Docs (W3Schools)",
      link: "https://www.w3schools.com/sql/",
    },
    {
      name: "Pandas Documentation",
      link: "https://pandas.pydata.org/docs/",
    },
    {
      name: "Matplotlib Guide",
      link: "https://matplotlib.org/stable/tutorials/index.html",
    },
    {
      name: "Power BI Documentation",
      link: "https://learn.microsoft.com/en-us/power-bi/",
    },
    {
      name: "Tableau Docs",
      link: "https://help.tableau.com/current/guides/e-learning/en-us/tableau-overview.html",
    },
    {
      name: "Khan Academy – Statistics",
      link: "https://www.khanacademy.org/math/statistics-probability",
    },
  ];

  return (
    <div className="p-6 pt-24 min-h-screen bg-gradient-to-br from-green-50 to-white">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-10">
        📊 Data Analyst Course
      </h1>

      {/* Documentation Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          📘 Documentation & Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {docs.map((doc, idx) => (
            <a
              key={idx}
              href={doc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-white border border-green-200 shadow hover:shadow-md rounded-lg hover:border-green-400 transition text-green-800 font-medium"
            >
              🔗 {doc.name}
            </a>
          ))}
        </div>
      </section>

      {/* YouTube Playlist */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-green-700 mb-2">
          🎥 YouTube Playlist
        </h2>
        <a
          href="https://www.youtube.com/playlist?list=PLUaB-1hjhk8H48Pj32z4GZgGWyylqv85f"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 underline text-lg hover:text-green-800 transition"
        >
          Complete Data Analyst Course – Alex The Analyst
        </a>
      </section>

      {/* Pricing Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-green-700 mb-2">
          💰 Course Price
        </h2>
        <p className="text-green-800 text-lg font-bold">₹999</p>
      </section>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap mt-6">
        <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          📥 Download Course PDF
        </button>
        <button className="px-6 py-2 bg-white text-green-700 border border-green-500 rounded hover:bg-green-100 transition">
          ✅ Track Progress
        </button>
      </div>
    </div>
  );
}
