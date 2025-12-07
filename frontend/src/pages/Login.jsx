import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { toast } from "react-toastify";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(form);
      login(res.data.user, res.data.token);

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Login to ElevateU
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 mb-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>

        <p className="text-center text-sm text-gray-500 mt-6 border-t pt-4">
          Admin? Go to{" "}
          <a href="/admin-login" className="text-blue-600 hover:underline">
            Admin Login
          </a>
        </p>
      </form>
    </div>
  );
}
