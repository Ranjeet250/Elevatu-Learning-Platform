import express from "express";
import {
  createRoadmap,
  getRoadmaps,
  updateRoadmap,
  deleteRoadmap,
} from "../controller/roadmapcontroller.js";
import { protect } from "../middleware/authMiddleware.js"; // ✅ removed adminOnly

const router = express.Router();

// 🔒 Only logged-in users can view and manage their roadmaps
router.get("/", protect, getRoadmaps);
router.post("/", protect, createRoadmap);
router.put("/:id", protect, updateRoadmap);
router.delete("/:id", protect, deleteRoadmap);

export default router;
