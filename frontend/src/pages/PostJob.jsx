// src/pages/PostJob.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    featured: false,
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Job posted successfully!");
        setTimeout(() => navigate("/manage-jobs"), 1500);
      } else {
        setMessage(`❌ Error: ${data.message || "Failed to post job"}`);
      }
    } catch (err) {
      console.error("Error posting job:", err);
      setMessage("❌ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 max-w-3xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Post a New Job</h1>

      {message && (
        <div className="mb-6 text-center font-semibold text-red-600">{message}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600"
          ></textarea>
        </div>

        {/* Featured */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="h-5 w-5 text-red-600 focus:ring-red-600 border-gray-300 rounded"
          />
          <label className="text-gray-700 font-medium">Mark as Featured</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition w-full font-semibold disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
