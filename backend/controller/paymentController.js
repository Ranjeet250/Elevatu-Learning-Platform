import Payment from "../models/payment.js";
import Course from "../models/course.js";
import User from "../models/user.js";

// Create payment intent (for UPI)
export const createPaymentIntent = async (req, res) => {
  try {
    const { courseId, upiId } = req.body;

    if (!courseId || !upiId) {
      return res.status(400).json({
        status: 400,
        message: "Course ID and UPI ID required",
      });
    }

    // Verify course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        status: 404,
        message: "Course not found",
      });
    }

    // Check if user already enrolled
    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({
        status: 400,
        message: "Already enrolled in this course",
      });
    }

    // If course is free, directly enroll
    if (course.price === 0) {
      course.enrolledStudents.push(req.user._id);
      await course.save();

      const payment = await Payment.create({
        userId: req.user._id,
        courseId,
        amount: 0,
        paymentMethod: "Free",
        status: "completed",
        metadata: {
          courseTitle: course.title,
          instructorId: course.instructor,
        },
      });

      return res.status(201).json({
        status: 201,
        message: "Enrolled successfully in free course",
        payment,
      });
    }

    // For paid courses, generate UPI payment link
    const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

    const payment = await Payment.create({
      userId: req.user._id,
      courseId,
      amount: course.price,
      paymentMethod: "UPI",
      upiId,
      transactionId,
      status: "pending",
      metadata: {
        courseTitle: course.title,
        instructorId: course.instructor,
      },
    });

    // Generate UPI deep link
    const upiLink = `upi://pay?pa=${upiId}&pn=ElevateU&am=${course.price}&tn=Course:${course.title}&tr=${transactionId}`;

    res.status(201).json({
      status: 201,
      message: "Payment intent created",
      payment,
      upiLink,
      transactionId,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({
      status: 500,
      message: error.message || "Failed to create payment",
    });
  }
};

// Verify payment and enroll student
export const verifyPayment = async (req, res) => {
  try {
    const { transactionId, status } = req.body;

    if (!transactionId) {
      return res.status(400).json({
        status: 400,
        message: "Transaction ID required",
      });
    }

    const payment = await Payment.findOne({ transactionId });

    if (!payment) {
      return res.status(404).json({
        status: 404,
        message: "Payment not found",
      });
    }

    // Update payment status
    payment.status = status === "success" ? "completed" : "failed";
    await payment.save();

    // If successful, enroll student
    if (payment.status === "completed") {
      const course = await Course.findById(payment.courseId);

      if (!course.enrolledStudents.includes(payment.userId)) {
        course.enrolledStudents.push(payment.userId);
        await course.save();
      }

      return res.status(200).json({
        status: 200,
        message: "Payment verified and enrolled successfully",
        payment,
      });
    }

    res.status(400).json({
      status: 400,
      message: "Payment verification failed",
      payment,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({
      status: 500,
      message: error.message || "Failed to verify payment",
    });
  }
};

// Get payment history
export const getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user._id })
      .populate("courseId", "title price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 200,
      message: "Payment history fetched",
      payments,
    });
  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).json({
      status: 500,
      message: "Failed to fetch payment history",
    });
  }
};

// Simulate webhook for payment confirmation (for testing)
export const confirmPayment = async (req, res) => {
  try {
    const { transactionId } = req.body;

    if (!transactionId) {
      return res.status(400).json({
        status: 400,
        message: "Transaction ID required",
      });
    }

    const payment = await Payment.findOne({ transactionId });

    if (!payment) {
      return res.status(404).json({
        status: 404,
        message: "Payment not found",
      });
    }

    payment.status = "completed";
    await payment.save();

    const course = await Course.findById(payment.courseId);
    if (!course.enrolledStudents.includes(payment.userId)) {
      course.enrolledStudents.push(payment.userId);
      await course.save();
    }

    res.status(200).json({
      status: 200,
      message: "Payment confirmed and student enrolled",
      payment,
      course,
    });
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({
      status: 500,
      message: "Failed to confirm payment",
    });
  }
};
