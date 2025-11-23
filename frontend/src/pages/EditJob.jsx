import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJob = () => {
  const { id } = useParams(); // job ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    featured: false,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();
        if (res.ok) {
          setFormData({
            title: data.title,
            company: data.company,
            location: data.location,
            description: data.description,
            featured: data.featured,
          });
        } else {
          setMessage("❌ Job not found");
        }
      } catch (err) {
        console.error("Error fetching job:", err);
        setMessage("❌ Server error while loading job");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

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

    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PUT", // update job
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("✅ Job updated successfully!");
        setTimeout(() => navigate("/manage-jobs"), 1500); // redirect after success
      } else {
        const errorData = await res.json();
        setMessage(`❌ Error: ${errorData.message || "Failed to update job"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error. Please try again later.");
    }
  };

  if (loading) {
    return <p className="text-center py-20 text-gray-500">Loading job...</p>;
  }

  return (
    <div className="pt-20 max-w-3xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Job</h1>

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
          className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition w-full font-semibold"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
