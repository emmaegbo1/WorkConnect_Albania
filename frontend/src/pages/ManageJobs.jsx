import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
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

  const deleteJob = async (id) => {
    setMessage("");
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (res.ok) {
        setJobs((prev) => prev.filter((job) => job._id !== id));
        setMessage("✅ Job deleted successfully");
      } else {
        setMessage(`❌ Error: ${data.message || "Failed to delete job"}`);
      }
    } catch (err) {
      console.error("Error deleting job:", err);
      setMessage("❌ Server error. Please try again later.");
    }
  };

  const toggleFeatured = async (id) => {
    setMessage("");
    try {
      const res = await fetch(`/api/jobs/${id}/featured`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (res.ok) {
        setJobs((prev) =>
          prev.map((job) =>
            job._id === id ? { ...job, featured: !job.featured } : job
          )
        );
        setMessage("✅ Job featured status updated");
      } else {
        setMessage(`❌ Error: ${data.message || "Failed to update job"}`);
      }
    } catch (err) {
      console.error("Error updating job:", err);
      setMessage("❌ Server error. Please try again later.");
    }
  };

  if (loading) {
    return <p className="text-center py-20 text-gray-500">Loading jobs...</p>;
  }

  return (
    <div className="pt-20 max-w-6xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Jobs</h1>

      {message && (
        <div className="mb-6 text-center font-semibold text-red-600">{message}</div>
      )}

      {jobs.length > 0 ? (
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow rounded-lg p-6 flex justify-between items-start"
            >
              <div>
                <h2 className="text-xl font-semibold text-red-600">{job.title}</h2>
                <p className="text-gray-700">{job.company}</p>
                <p className="text-gray-500 text-sm mb-2">{job.location}</p>
                <p className="text-gray-600 mb-2">
                  {job.description.slice(0, 120)}...
                </p>
                <p className="text-sm font-medium">
                  Featured:{" "}
                  <span className={job.featured ? "text-green-600" : "text-gray-600"}>
                    {job.featured ? "Yes" : "No"}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  to={`/jobs/${job._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View
                </Link>
                <Link
                  to={`/jobs/${job._id}/edit`}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
                >
                  Edit
                </Link>
                <Link
                  to={`/jobs/${job._id}/applications`}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Applications
                </Link>
                <button
                  onClick={() => toggleFeatured(job._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  {job.featured ? "Unfeature" : "Feature"}
                </button>
                <button
                  onClick={() => deleteJob(job._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No jobs found.</p>
      )}
    </div>
  );
};

export default ManageJobs;
