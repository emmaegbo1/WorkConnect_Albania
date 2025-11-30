// src/pages/ManageJobs.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Delete job
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setJobs((prev) => prev.filter((job) => job._id !== id));
        alert("Job deleted successfully!");
      } else {
        alert("Failed to delete job");
      }
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  if (loading) {
    return <p className="text-center py-20 text-gray-500">Loading jobs...</p>;
  }

  return (
    <div className="pt-24 bg-gray-50 min-h-screen px-6">
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
          Manage <span className="text-red-600">Jobs</span>
        </h2>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs available.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Company</th>
                  <th className="px-4 py-2 border">Location</th>
                  <th className="px-4 py-2 border">Role</th>
                  <th className="px-4 py-2 border">Type</th>
                  <th className="px-4 py-2 border">Featured</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{job.title}</td>
                    <td className="px-4 py-2 border">{job.company}</td>
                    <td className="px-4 py-2 border">{job.location}</td>
                    <td className="px-4 py-2 border">{job.role}</td>
                    <td className="px-4 py-2 border">{job.jobType}</td>
                    <td className="px-4 py-2 border">
                      {job.featured ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-2 border flex gap-2">
                      <Link
                        to={`/jobs/${job._id}/edit`}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}