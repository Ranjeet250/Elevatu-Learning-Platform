import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userouteslogin.js";
import courseRoutes from "./routes/courseroutes.js";
import taskRoutes from "./routes/taskroutes.js";
import connectDB from "./config/db.js";
import roadmapRoutes from "./routes/roadmaproutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/roadmaps", roadmapRoutes);

app.get("/", (req, res) => {
  res.send("🚀 ElevateU API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
