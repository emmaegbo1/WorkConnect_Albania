import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await login(form);
    nav("/");
  };

  return (
    <div className="pt-24 bg-gray-50 min-h-screen px-6">
      <section className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Login to <span className="text-red-600">WorkConnect ALBANIA</span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed mb-12">
          Access your account to find jobs, manage postings, and connect with opportunities.
        </p>

        {/* Login Form */}
        <form onSubmit={submit} className="grid gap-4 max-w-md mx-auto text-left">
          <input
            type="email"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>

        {/* Forgot Password */}
        <p className="text-center mt-4">
          <Link to="/forgot-password" className="text-gray-600 hover:text-red-600 transition">
            Forgot your password?
          </Link>
        </p>

        {/* Switch to Register */}
        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-red-600 hover:underline">
            Register here
          </Link>
        </p>
      </section>
    </div>
  );
}