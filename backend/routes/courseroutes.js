import express from "express";
import { createCourse } from "../controller/coursecontroller.js";
import { protect } from "../middleware/authMiddleware.js"; // ✅ Removed adminOnly

const router = express.Router();

router.post("/", protect, createCourse); // ✅ Only logged-in users can create

export default router;
