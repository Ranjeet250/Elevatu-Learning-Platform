// Load env first
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import resumeRoutes from "./routes/resume.routes.js";
import courseRoutes from "./routes/courseroutes.js";
import userRoutes from "./routes/userouteslogin.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

// Validate required environment variables
const requiredEnvVars = [
  "HUGGINGFACE_API_KEY",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "JWT_SECRET",
  "MONGO_URI",
];

const missingEnvVars = requiredEnvVars.filter((v) => !process.env[v]);
if (missingEnvVars.length > 0) {
  console.error(`Missing environment variables: ${missingEnvVars.join(", ")}`);
  process.exit(1);
}

// Start the server
const startServer = async () => {
  try {
    await connectDB();

    const app = express();

    // CORS configuration - restrict to allowed origins
    const allowedOrigins = [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:3000",
    ];
    app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        credentials: true,
      }),
    );

    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ limit: "10mb", extended: true }));

    // Routes
    app.use("/api/resume", resumeRoutes);
    app.use("/api/courses", courseRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/payments", paymentRoutes);

    // Health check endpoint
    app.get("/api/health", (req, res) => {
      res.json({ status: "Server is running", timestamp: new Date() });
    });

    // 404 handler
    app.use((req, res) => {
      res.status(404).json({
        status: 404,
        message: "Route not found",
      });
    });

    // Global error handler (must be last)
    app.use(errorHandler);

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
