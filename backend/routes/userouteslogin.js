import express from "express";
import { registerUser, loginUser, getCurrentUser } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", protect, getCurrentUser);

export default router;
