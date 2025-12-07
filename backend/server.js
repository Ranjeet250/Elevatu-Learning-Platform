// Load env first
import dotenv from "dotenv";
dotenv.config();

// Debug environment
console.log(
  "DEBUG env keys:",
  Object.keys(process.env).filter(
    (k) =>
      k.includes("HUGGINGFACE") ||
      k.includes("CLOUDINARY") ||
      k.includes("PORT") ||
      k.includes("JWT")
  )
);
console.log("DEBUG HuggingFace Token:", process.env.HUGGINGFACE_API_KEY);
console.log("DEBUG PORT:", process.env.PORT);

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import resumeRoutes from "./routes/resume.routes.js";
import courseRoutes from "./routes/courseroutes.js";
import userRoutes from "./routes/userouteslogin.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// Check for API keys
if (!process.env.HUGGINGFACE_API_KEY) {
  console.error("HUGGINGFACE_API_KEY is missing in .env");
} else {
  console.log("HUGGINGFACE_API_KEY found");
}

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.error("Cloudinary keys are missing in .env");
} else {
  console.log("Cloudinary keys found");
}

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing in .env");
} else {
  console.log("JWT_SECRET found");
}

// Start the server
const startServer = async () => {
  try {
    await connectDB();

    const app = express();
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use("/api/resume", resumeRoutes);
    app.use("/api/courses", courseRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/payments", paymentRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
