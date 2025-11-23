import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const { resetPassword } = useAuth(); // assumes your AuthContext has a resetPassword function
  const nav = useNavigate();
  const [email, setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await resetPassword(email);
    // After sending reset instructions, redirect or show confirmation
    nav("/login");
  };

  return (
    <div className="pt-24 bg-gray-50 min-h-screen px-6">
      <section className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Reset Your <span className="text-red-600">Password</span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed mb-12">
          Enter your email address below and we’ll send you instructions to reset your password.
        </p>

        {/* Forgot Password Form */}
        <form onSubmit={submit} className="grid gap-4 max-w-md mx-auto text-left">
          <input
            type="email"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-center mt-6 text-gray-600">
          Remembered your password?{" "}
          <Link to="/login" className="text-red-600 hover:underline">
            Login here
          </Link>
        </p>
      </section>
    </div>
  );
}
