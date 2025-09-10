import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { analyzeResume } from "../api/resumeapi";

export default function ResumeChecker() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please upload a resume first!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);

      // Simulate backend analysis
      const response = await analyzeResume(formData);

      // Navigate to result page with analysis data
      navigate("/result", { state: { result: response.analysis } });
    } catch (err) {
      console.error(err);
      toast.error("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-6 text-purple-800 text-center">
        📄 Professional Resume Checker
      </h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="mb-4 w-full p-2 border border-gray-300 rounded"
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-purple-600 text-white w-full py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
      >
        {loading ? "Analyzing Resume..." : "Upload & Analyze"}
      </button>

      {loading && (
        <p className="mt-3 text-center text-gray-600">
          Please wait, extracting key info & computing ATS score...
        </p>
      )}
    </div>
  );
}
