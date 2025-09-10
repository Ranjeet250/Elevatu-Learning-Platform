import express from "express";
import upload from "../middleware/upload.js";
import {
  uploadResume,
  getAllResumes,
} from "../controller/resume.controller.js";

const router = express.Router();

/**
 * @route   POST /api/resumes/upload
 * @desc    Upload a resume, send to Cloudinary, analyze with Hugging Face, save in MongoDB
 */
router.post("/upload", upload, uploadResume);

/**
 * @route   GET /api/resumes
 * @desc    Get all uploaded resumes (filename, Cloudinary URL, analysis, timestamps)
 */
router.get("/", getAllResumes);

export default router;
