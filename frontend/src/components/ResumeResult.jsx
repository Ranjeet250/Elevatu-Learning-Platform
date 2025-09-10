import { useLocation, useNavigate } from "react-router-dom";

export default function ResumeResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">⚠️ No analysis data found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to Upload
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-bold mb-4 text-purple-700">
        Resume Analysis Result
      </h2>

      {/* ATS Score */}
      <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
        <h3 className="text-xl font-semibold mb-2">ATS Score</h3>
        <p className="text-gray-800 text-lg">{result.atsScore || 0}/100</p>
      </div>

      {/* Skills */}
      <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
        <h3 className="text-xl font-semibold mb-2">Skills</h3>
        {result.skills.length ? (
          <ul className="list-disc list-inside text-gray-700">
            {result.skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No skills detected</p>
        )}
      </div>

      {/* Experience */}
      <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
        <h3 className="text-xl font-semibold mb-2">Experience</h3>
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
