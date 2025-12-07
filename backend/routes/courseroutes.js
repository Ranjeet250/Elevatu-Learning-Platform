import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addRoadmapStep,
  publishCourse,
  getAdminCourses,
  enrollCourse,
} from "../controller/courseController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// Student routes
router.post("/:id/enroll", protect, enrollCourse);

// Admin routes
router.post("/", protect, adminOnly, createCourse);
router.put("/:id", protect, adminOnly, updateCourse);
router.delete("/:id", protect, adminOnly, deleteCourse);
router.post("/:id/roadmap-step", protect, adminOnly, addRoadmapStep);
router.post("/:id/publish", protect, adminOnly, publishCourse);
router.get("/admin/my-courses", protect, adminOnly, getAdminCourses);

export default router;
