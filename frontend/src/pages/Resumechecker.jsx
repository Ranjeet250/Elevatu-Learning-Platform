import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { analyzeResume } from "../api/resumeapi";

export default function ResumeChecker() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please upload a resume first!");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await analyzeResume(formData);

      if (response.status === 201 && response.data) {
        toast.success("Resume analyzed successfully!");
        navigate("/result", { 
          state: { 
            result: response.data.analysis,
            filename: response.data.filename,
            fileUrl: response.data.fileUrl
          } 
        });
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (err) {
      console.error("Resume analysis error:", err);
      const errorMessage = err.message || "Failed to analyze resume. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 mb-10">
      <h2 className="text-3xl font-bold mb-2 text-purple-800 text-center">
        📄 Professional Resume Checker
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Upload your resume to get instant ATS score, skills analysis, and improvement suggestions
      </p>

      <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 mb-4 text-center hover:border-purple-500 transition">
        <label className="cursor-pointer">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">📁</span>
            <p className="text-gray-700 font-semibold">
              {fileName || "Click or drag file here"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              PDF, DOC, DOCX, or TXT (Max 10MB)
            </p>
          </div>
        </label>
      </div>

      {fileName && (
        <p className="text-sm text-green-600 mb-4">
          ✅ File selected: <strong>{fileName}</strong>
        </p>
      )}

      <button
        onClick={handleAnalyze}
        disabled={loading || !file}
        className="bg-purple-600 text-white w-full py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <span className="animate-spin mr-2">⏳</span>
            Analyzing Resume...
          </span>
        ) : (
          "Upload & Analyze Resume"
        )}
      </button>

      {loading && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-center text-blue-800">
            🔄 Processing your resume... This may take a moment as we:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-blue-700 ml-4">
            <li>✓ Extracting text from your document</li>
            <li>✓ Analyzing skills and experience</li>
            <li>✓ Calculating ATS score</li>
            <li>✓ Generating improvement suggestions</li>
          </ul>
        </div>
      )}
    </div>
  );
}
