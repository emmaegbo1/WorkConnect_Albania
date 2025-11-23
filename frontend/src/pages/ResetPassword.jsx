import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams(); // get token from URL
  const nav = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post(`/api/auth/reset/${token}`, { password });
      alert("Password reset successful. You can now login.");
      nav("/login");
    } catch (err) {
      alert("Reset failed. The link may be invalid or expired.");
    }
  };

  return (
    <div className="pt-24 bg-gray-50 min-h-screen px-6">
      <section className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Set a New <span className="text-red-600">Password</span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed mb-12">
          Enter your new password below to complete the reset process.
        </p>

        {/* Reset Password Form */}
        <form onSubmit={submit} className="grid gap-4 max-w-md mx-auto text-left">
          <input
            type="password"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
          >
            Reset Password
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
