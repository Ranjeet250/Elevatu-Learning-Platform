export default function CybersecurityCourse() {
  const docs = [
    {
      name: "Networking Fundamentals (Cisco)",
      link: "https://skillsforall.com/course/networking-basics",
    },
    {
      name: "Linux Security (Ubuntu Hardening)",
      link: "https://ubuntu.com/server/docs/security-hardening",
    },
    {
      name: "Windows Security (Microsoft Docs)",
      link: "https://learn.microsoft.com/en-us/windows/security/",
    },
    {
      name: "Kali Linux Tools",
      link: "https://tools.kali.org/tools-listing",
    },
    {
      name: "Burp Suite Docs",
      link: "https://portswigger.net/burp/documentation",
    },
    {
      name: "Cryptography Overview (MDN)",
      link: "https://developer.mozilla.org/en-US/docs/Web/Security/Information_Security",
    },
    {
      name: "Wireshark User Guide",
      link: "https://www.wireshark.org/docs/wsug_html_chunked/",
    },
    {
      name: "Splunk Security Docs",
      link: "https://docs.splunk.com/Documentation/Security",
    },
  ];

  return (
    <div className="p-6 pt-24 min-h-screen bg-gradient-to-br from-red-50 to-white">
      <h1 className="text-4xl font-bold text-center text-red-800 mb-10">
        🔐 Cybersecurity Course
      </h1>

      {/* Documentation Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-red-700 mb-4">
          📘 Documentation & Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {docs.map((doc, idx) => (
            <a
              key={idx}
              href={doc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-white border border-red-200 shadow hover:shadow-md rounded-lg hover:border-red-400 transition text-red-800 font-medium"
            >
              🔗 {doc.name}
            </a>
          ))}
        </div>
      </section>

      {/* YouTube Playlist */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-red-700 mb-2">
          🎥 YouTube Playlist
        </h2>
        <a
          href="https://www.youtube.com/playlist?list=PLBf0hzazHTGMJ3A0y8B7N2AoNShb7fgyM"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 underline text-lg hover:text-red-800 transition"
        >
          Ethical Hacking Full Course – FreeCodeCamp or NetworkChuck
        </a>
      </section>

      {/* Pricing Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-red-700 mb-2">
          💰 Course Price
        </h2>
        <p className="text-green-700 text-lg font-bold">₹1499</p>
      </section>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap mt-6">
        <button className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
          📥 Download Course PDF
        </button>
        <button className="px-6 py-2 bg-white text-red-700 border border-red-500 rounded hover:bg-red-100 transition">
          ✅ Track Progress
        </button>
      </div>
    </div>
  );
}
