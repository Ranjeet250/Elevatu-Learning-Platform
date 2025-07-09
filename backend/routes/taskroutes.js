import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controller/taskcontroller.js";
import { protect } from "../middleware/authMiddleware.js"; // ✅ Removed adminOnly

const router = express.Router();

// 🔒 Logged-in users only
router.get("/", protect, getTasks);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
