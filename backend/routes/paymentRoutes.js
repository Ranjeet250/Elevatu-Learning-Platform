import express from "express";
import {
  createPaymentIntent,
  verifyPayment,
  getPaymentHistory,
  confirmPayment,
} from "../controller/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create payment intent
router.post("/create-intent", protect, createPaymentIntent);

// Verify payment
router.post("/verify", protect, verifyPayment);

// Confirm payment (webhook simulation)
router.post("/confirm", protect, confirmPayment);

// Get payment history
router.get("/history", protect, getPaymentHistory);

export default router;
