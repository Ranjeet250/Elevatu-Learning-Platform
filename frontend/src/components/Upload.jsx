import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Upload({ setResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // handle upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("⚠️ Please select a file first!");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      // ✅ update this URL if your backend route is different
      const { data } = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success(data.message || "✅ Uploaded successfully!");
      setResult(data); // pass full response (includes url + analysis)
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to upload resume. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="flex flex-col items-center gap-4 p-6 border-2 border-dashed rounded-lg bg-gray-50"
    >
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                   file:rounded-full file:border-0 
                   file:text-sm file:font-semibold 
                   file:bg-blue-50 file:text-blue-700 
                   hover:file:bg-blue-100"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload & Analyze"}
      </button>
    </form>
  );
}
