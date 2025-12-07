import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { getCourseById, enrollCourse } from "../services/courseService";
import axiosClient from "../services/axiosClient";
import { toast } from "react-toastify";

export default function PaymentEnrollment() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await getCourseById(id);
      setCourse(response.data.course);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load course");
      navigate("/courses");
      setLoading(false);
    }
  };

  const handleProceedToPayment = async () => {
    if (course.price === 0) {
      try {
        setProcessing(true);
        await enrollCourse(id);
        toast.success("Enrolled successfully in free course!");
        navigate(`/courses/${id}`);
      } catch (error) {
        toast.error("Enrollment failed");
      } finally {
        setProcessing(false);
      }
    } else {
      if (!upiId.trim()) {
        toast.error("Please enter your UPI ID");
        return;
      }
      setStep(2);
    }
  };

  const handleConfirmPayment = async () => {
    try {
      setProcessing(true);

      const paymentResponse = await axiosClient.post("/payments/create-intent", {
        courseId: id,
        upiId: upiId,
        amount: course.price,
      });

      const { transactionId } = paymentResponse.data;

      await axiosClient.post("/payments/verify", {
        transactionId, courseId: id, status: "success" });

      toast.success("Payment confirmed! You're now enrolled.");
      navigate(`/courses/${id}`);
    } catch (error) {
      toast.error("Payment failed: " + error.response?.data?.message);
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading course...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Course not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {step === 1 ? "Course Enrollment" : "Confirm Payment"}
          </h1>
          <p className="text-gray-600 mb-8">Step {step} of 2</p>

          {step === 1 && (
            <div className="space-y-6">
              <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Course Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Course:</span>
                    <span className="font-semibold text-gray-800">
                      {course.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Instructor:</span>
                    <span className="font-semibold text-gray-800">
                      {course.instructor?.name || "ElevateU"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Level:</span>
                    <span className="font-semibold text-gray-800">
                      {course.level}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="text-lg font-bold text-gray-800">
                      Amount:
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      Rs. {course.price}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Student Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={user?.name || ""}
                      readOnly
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      readOnly
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
                    />
                  </div>

                  {course.price > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        placeholder="example@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Example: yourname@paytm, yourname@okhdfcbank, etc.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleProceedToPayment}
                disabled={processing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
              >
                {processing
                  ? "Processing..."
                  : course.price === 0
                  ? "Enroll Now (Free)"
                  : "Proceed to Payment"}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="border-2 border-orange-200 rounded-lg p-6 bg-orange-50">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Payment Confirmation
                </h2>
                <div className="space-y-3">
                  <p className="text-gray-700">You're about to pay for:</p>
                  <div className="bg-white p-4 rounded border-l-4 border-orange-500">
                    <p className="font-semibold text-gray-800">
                      {course.title}
                    </p>
                    <p className="text-2xl font-bold text-orange-600 mt-2">
                      Rs. {course.price}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    UPI ID: <span className="font-semibold">{upiId}</span>
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Click confirm to complete your enrollment.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  disabled={processing}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg transition"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmPayment}
                  disabled={processing}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
                >
                  {processing ? "Processing..." : "Confirm & Enroll"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

