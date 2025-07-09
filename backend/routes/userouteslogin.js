import express from "express";
import { registerUser, loginUser } from "../controller/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// ❌ Removed the unused /admin/dashboard route and adminOnly middleware

export default router;
