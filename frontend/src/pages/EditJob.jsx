// src/pages/EditJob.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditJob() {
  const { id } = useParams(); // job ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`);
        const data = await res.json();

        setFormData({
          title: data.title,
          company: data.company,
          location: data.location,
          role: data.role,
          jobType: data.jobType,
          salaryMin: data.salaryRange?.min || "",
          salaryMax: data.salaryRange?.max || "",
          currency: data.salaryRange?.currency || "EUR",
          description: data.description,
          requirements: data.requirements?.join(", ") || "",
          responsibilities: data.responsibilities?.join(", ") || "",
          benefits: data.benefits?.join(", ") || "",
          featured: data.featured,
        });
      } catch (err) {
        console.error("Error fetching job:", err);
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

    const payload = {
      ...formData,
      requirements: formData.requirements.split(",").map((r) => r.trim()),
      responsibilities: formData.responsibilities.split(",").map((r) => r.trim()),
      benefits: formData.benefits.split(",").map((b) => b.trim()),
      salaryRange: {
        min: formData.salaryMin,
        max: formData.salaryMax,
        currency: formData.currency,
      },
    };

    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Job updated successfully!");
        navigate(`/jobs/${id}`);
      } else {
        alert("Failed to update job");
      }
    } catch (err) {
      console.error("Error updating job:", err);
    }
  };

  if (loading || !formData) {
    return <p className="text-center py-20 text-gray-500">Loading job...</p>;
  }

  return (
    <div className="pt-24 bg-gray-50 min-h-screen px-6">
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
          Edit <span className="text-red-600">Job</span>
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 bg-white shadow rounded-lg p-8"
        >
          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />

          {/* Company */}
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />

          {/* Role */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          >
            <option value="">Select Role</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
            <option value="analyst">Analyst</option>
            <option value="marketing">Marketing</option>
            <option value="other">Other</option>
          </select>

          {/* Job Type */}
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="remote">Remote</option>
          </select>

          {/* Salary Range */}
          <div className="grid grid-cols-3 gap-4">
            <input
              type="number"
              name="salaryMin"
              value={formData.salaryMin}
              onChange={handleChange}
              placeholder="Min Salary"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <input
              type="number"
              name="salaryMax"
              value={formData.salaryMax}
              onChange={handleChange}
              placeholder="Max Salary"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            rows={4}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />

          {/* Requirements */}
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Requirements (comma separated)"
            rows={2}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          {/* Responsibilities */}
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            placeholder="Responsibilities (comma separated)"
            rows={2}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          {/* Benefits */}
          <textarea
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
            placeholder="Benefits (comma separated)"
            rows={2}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          {/* Featured */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 text-red-600 focus:ring-red-600"
            />
            <span className="text-gray-700">Mark as Featured</span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition"
          >
            Update Job
          </button>
        </form>
      </section>
    </div>
  );
}









// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const EditJob = () => {
//   const { id } = useParams(); // job ID from URL
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: "",
//     company: "",
//     location: "",
//     description: "",
//     featured: false,
//   });
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchJob = async () => {
//       try {
//         const res = await fetch(`/api/jobs/${id}`);
//         const data = await res.json();
//         if (res.ok) {
//           setFormData({
//             title: data.title,
//             company: data.company,
//             location: data.location,
//             description: data.description,
//             featured: data.featured,
//           });
//         } else {
//           setMessage("❌ Job not found");
//         }
//       } catch (err) {
//         console.error("Error fetching job:", err);
//         setMessage("❌ Server error while loading job");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJob();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await fetch(`/api/jobs/${id}`, {
//         method: "PUT", // update job
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         setMessage("✅ Job updated successfully!");
//         setTimeout(() => navigate("/manage-jobs"), 1500); // redirect after success
//       } else {
//         const errorData = await res.json();
//         setMessage(`❌ Error: ${errorData.message || "Failed to update job"}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Server error. Please try again later.");
//     }
//   };

//   if (loading) {
//     return <p className="text-center py-20 text-gray-500">Loading job...</p>;
//   }

//   return (
//     <div className="pt-20 max-w-3xl mx-auto px-6">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Job</h1>

//       {message && (
//         <div className="mb-6 text-center font-semibold text-red-600">{message}</div>
//       )}

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-lg p-8 space-y-6"
//       >
//         {/* Title */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Job Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600"
//           />
//         </div>

//         {/* Company */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Company</label>
//           <input
//             type="text"
//             name="company"
//             value={formData.company}
//             onChange={handleChange}
//             required
//             className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600"
//           />
//         </div>

//         {/* Location */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Location</label>
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//             className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows="5"
//             required
//             className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600"
//           ></textarea>
//         </div>

//         {/* Featured */}
//         <div className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             name="featured"
//             checked={formData.featured}
//             onChange={handleChange}
//             className="h-5 w-5 text-red-600 focus:ring-red-600 border-gray-300 rounded"
//           />
//           <label className="text-gray-700 font-medium">Mark as Featured</label>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition w-full font-semibold"
//         >
//           Update Job
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditJob;
