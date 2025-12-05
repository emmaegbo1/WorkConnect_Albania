// src/pages/Register.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = await register(form); // register returns user object from AuthContext

      if (user) {
        // ✅ Redirect based on role
        if (user.role === "admin" || user.role === "recruiter") {
          navigate("/dashboard");
        } else {
          navigate("/profile");
        }
      } else {
        setError("Registration failed. Please check your details.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 bg-gray-50 min-h-screen px-6">
      <section className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Create Your <span className="text-red-600">WorkConnect ALBANIA</span> Account
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed mb-12">
          Join our community of global talent and access trusted opportunities in Albania.
        </p>

        {/* Register Form */}
        <form onSubmit={submit} className="grid gap-4 max-w-md mx-auto text-left">
          <input
            type="text"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
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

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Switch to Login */}
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 hover:underline">
            Login here
          </Link>
        </p>
      </section>
    </div>
  );
}















// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";

// export default function Register() {
//   const { register } = useAuth();
//   const nav = useNavigate();
//   const [form, setForm] = useState({ name: "", email: "", password: "" });

//   const submit = async (e) => {
//     e.preventDefault();
//     await register(form);
//     nav("/");
//   };

//   return (
//     <div className="pt-24 bg-gray-50 min-h-screen px-6">
//       <section className="max-w-6xl mx-auto text-center">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//           Create Your <span className="text-red-600">WorkConnect ALBANIA</span> Account
//         </h2>
//         <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed mb-12">
//           Join our community of global talent and access trusted opportunities in Albania.
//         </p>

//         {/* Register Form */}
//         <form onSubmit={submit} className="grid gap-4 max-w-md mx-auto text-left">
//           <input
//             type="text"
//             className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
//             placeholder="Full name"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             required
//           />
//           <input
//             type="email"
//             className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             required
//           />
//           <input
//             type="password"
//             className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
//             placeholder="Password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             required
//           />
//           <button
//             type="submit"
//             className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
//           >
//             Create Account
//           </button>
//         </form>

//         {/* Switch to Login */}
//         <p className="text-center mt-6 text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-red-600 hover:underline">
//             Login here
//           </Link>
//         </p>
//       </section>
//     </div>
//   );
// }