import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ApplyJob = () => {
  const { id } = useParams(); // job ID from URL
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cv: "",
    coverLetter: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`/api/jobs/${id}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("✅ Application submitted successfully!");
        setFormData({ name: "", email: "", cv: "", coverLetter: "" });
      } else {
        setMessage("❌ Error submitting application. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error. Please try again later.");
    }
  };

  return (
    <div className="pt-20 max-w-3xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Apply for this Job</h1>

      {message && (
        <div className="mb-6 text-center font-semibold text-red-600">{message}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* CV (link or text) */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">CV / Resume (URL)</label>
          <input
            type="url"
            name="cv"
            value={formData.cv}
            onChange={handleChange}
            placeholder="Link to your CV (Google Drive, Dropbox, etc.)"
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Cover Letter</label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows="5"
            placeholder="Write a short cover letter..."
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition w-full font-semibold"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyJob;
