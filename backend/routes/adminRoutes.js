import express from "express";
import {
    getAllUsers,
    updateUserRole,
    deleteUser,
    getAdminStats,
} from "../controller/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// All routes require admin access
router.use(protect, adminOnly);

// Dashboard stats
router.get("/stats", getAdminStats);

// User management
router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

export default router;
