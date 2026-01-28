import { useLocation, useNavigate } from "react-router-dom";

export default function ResumeResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-red-500 text-lg">⚠️ No analysis data found.</p>
          <button
            onClick={() => navigate("/resume-checker")}
            className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Back to Resume Checker
          </button>
        </div>
      </div>
    );
  }

  // Helper to get score color
  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-400";
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-400";
    return "bg-red-100 text-red-800 border-red-400";
  };

  const getScoreBg = (score) => {
    if (score >= 80) return "from-green-500 to-green-600";
    if (score >= 60) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 pb-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/resume-checker")}
            className="text-purple-600 hover:text-purple-800 mb-4 flex items-center"
          >
            ← Back to Upload
          </button>
          <h1 className="text-4xl font-bold text-gray-800">
            Resume Analysis Report
          </h1>
          <p className="text-gray-600 mt-2">Detailed insights and recommendations</p>
        </div>

        {/* ATS Score - Large Card */}
        <div className={`bg-gradient-to-br ${getScoreBg(result.atsScore)} text-white rounded-xl p-8 shadow-lg mb-8`}>
          <p className="text-lg opacity-90 mb-2">ATS Compatibility Score</p>
          <div className="flex items-baseline">
            <span className="text-6xl font-bold">{result.atsScore || 0}</span>
            <span className="text-3xl opacity-80 ml-2">/100</span>
          </div>
          <p className="mt-4 opacity-90">
            {result.atsScore >= 80
              ? "✅ Excellent - Your resume is ATS-friendly!"
              : result.atsScore >= 60
              ? "⚠️ Good - Some improvements needed"
              : "❌ Needs improvement - Follow suggestions below"}
          </p>
        </div>

        {/* Contact Info */}
        {result.contact && (
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">📋 Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-gray-800 font-semibold">{result.contact.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-gray-800 font-semibold">{result.contact.phone}</p>
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        {result.summary && (
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">📝 Summary</h3>
            <p className="text-gray-700 leading-relaxed">{result.summary}</p>
          </div>
        )}

        {/* Skills */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">💼 Skills Detected</h3>
          {result.skills && result.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {result.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No specific skills detected</p>
          )}
        </div>

        {/* Suitable Roles */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🎯 Suitable Roles</h3>
          {result.suitableRoles && result.suitableRoles.length > 0 ? (
            <div className="space-y-2">
              {result.suitableRoles.map((role, idx) => (
                <div key={idx} className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>{role}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No roles suggested</p>
          )}
        </div>

        {/* Strengths */}
        {result.strengths && result.strengths.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">✨ Strengths</h3>
            <div className="space-y-2">
              {result.strengths.map((strength, idx) => (
                <div key={idx} className="flex items-center text-gray-700 bg-green-50 p-3 rounded">
                  <span className="text-green-600 mr-3 font-bold">✓</span>
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Improvements */}
        {result.improvements && result.improvements.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">🔧 Areas for Improvement</h3>
            <div className="space-y-2">
              {result.improvements.map((improvement, idx) => (
                <div key={idx} className="flex items-start text-gray-700 bg-yellow-50 p-3 rounded">
                  <span className="text-yellow-600 mr-3 font-bold">→</span>
                  <span>{improvement}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {result.experience && result.experience.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">💼 Experience</h3>
            <div className="space-y-3">
              {result.experience.map((exp, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold text-gray-800">{exp.role}</p>
                  <p className="text-sm text-gray-600">{exp.company} • {exp.duration}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {result.education && result.education.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">🎓 Education</h3>
            <div className="space-y-3">
              {result.education.map((edu, idx) => (
                <div key={idx} className="border-l-4 border-purple-500 pl-4">
                  <p className="font-semibold text-gray-800">{edu.degree}</p>
                  <p className="text-sm text-gray-600">{edu.institution} • {edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Keywords */}
        {result.keywords && result.keywords.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">🏷️ Keywords Found</h3>
            <div className="flex flex-wrap gap-2">
              {result.keywords.slice(0, 15).map((keyword, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate("/resume-checker")}
            className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-semibold"
          >
            Analyze Another Resume
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 font-semibold"
          >
            Print Report
          </button>
        </div>
      </div>
    </div>
  );
}
        {result.experience.length ? (
          <ul className="list-disc list-inside text-gray-700">
            {result.experience.map((exp, idx) => (
              <li key={idx}>
                {exp.role} at {exp.company} ({exp.duration})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No experience detected</p>
        )}
      </div>

      {/* Education */}
      <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-600">
        <h3 className="text-xl font-semibold mb-2">Education</h3>
        {result.education.length ? (
          <ul className="list-disc list-inside text-gray-700">
            {result.education.map((edu, idx) => (
              <li key={idx}>
                {edu.degree} from {edu.institution} ({edu.year})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No education detected</p>
        )}
      </div>

      {/* Suitable Roles */}
      {result.suitableRoles?.length > 0 && (
        <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-600">
          <h3 className="text-xl font-semibold mb-2">Suitable Roles</h3>
          <ul className="list-disc list-inside text-gray-700">
            {result.suitableRoles.map((role, idx) => (
              <li key={idx}>{role}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          Back to Upload
        </button>
      </div>
    </div>
  );
}
