import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response.data.message || "Error registering");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input
        type="text"
        placeholder="Name"
        className="w-full border p-2 mb-3"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 mb-3"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 mb-4"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Register
      </button>
    </form>
  );
}
