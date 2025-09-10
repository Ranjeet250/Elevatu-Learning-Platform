// ✅ Load env first
import dotenv from "dotenv";
dotenv.config();

// ✅ Debug environment
console.log(
  "DEBUG env keys:",
  Object.keys(process.env).filter(
    (k) =>
      k.includes("HUGGINGFACE") ||
      k.includes("CLOUDINARY") ||
      k.includes("PORT")
  )
);
console.log("DEBUG HuggingFace Token:", process.env.HUGGINGFACE_API_KEY);
console.log("DEBUG PORT:", process.env.PORT);

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import resumeRoutes from "./routes/resume.routes.js";

// 🔑 Check for API keys
if (!process.env.HUGGINGFACE_API_KEY) {
  console.error("❌ HUGGINGFACE_API_KEY is missing in .env");
} else {
  console.log("✅ HUGGINGFACE_API_KEY found");
}

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.error("❌ Cloudinary keys are missing in .env");
} else {
  console.log("✅ Cloudinary keys found");
}

// Start the server
const startServer = async () => {
  try {
    await connectDB();

    const app = express();
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use("/api/resumes", resumeRoutes);

    // Health check
    app.get("/", (req, res) => {
      res.send("🚀 ElevateU API with Hugging Face + Cloudinary is running...");
    });

    // ✅ Fix: use PORT, not PORT_NO
    const PORT = process.env.PORT || 4003;
    app.listen(PORT, () =>
      console.log(`✅ Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
