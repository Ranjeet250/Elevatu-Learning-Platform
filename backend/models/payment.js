import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["UPI", "Card", "NetBanking", "Free"],
      default: "UPI",
    },
    upiId: {
      type: String,
      default: null,
    },
    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "cancelled"],
      default: "pending",
    },
    paymentDetails: {
      orderId: String,
      paymentId: String,
      signature: String,
    },
    metadata: {
      courseTitle: String,
      instructorId: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
