import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Applications = () => {
  const { id } = useParams(); // job ID
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingIndex, setUpdatingIndex] = useState(null); // track which application is being updated
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const job = await res.json();
        setApplications(job.applications || []);
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [id]);

  const updateStatus = async (index, status) => {
    setUpdatingIndex(index);
    setMessage("");

    try {
      const res = await fetch(`/api/jobs/${id}/applications/${index}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();

      if (res.ok) {
        setApplications((prev) =>
          prev.map((app, i) => (i === index ? { ...app, status } : app))
        );
        setMessage(`✅ Application status updated to "${status}"`);
      } else {
        setMessage(`❌ Error: ${data.message || "Failed to update status"}`);
      }
    } catch (err) {
      console.error("Error updating status:", err);
      setMessage("❌ Server error. Please try again later.");
    } finally {
      setUpdatingIndex(null);
    }
  };

  if (loading) {
    return <p className="text-center py-20 text-gray-500">Loading applications...</p>;
  }

  return (
    <div className="pt-20 max-w-5xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Job Applications</h1>

      {message && (
        <div className="mb-6 text-center font-semibold text-red-600">{message}</div>
      )}

      {applications.length > 0 ? (
        <div className="space-y-6">
          {applications.map((app, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg p-6 flex justify-between items-start"
            >
              <div>
                <h2 className="text-xl font-semibold text-red-600">{app.name}</h2>
                <p className="text-gray-700">{app.email}</p>
                <p className="text-gray-500 text-sm mb-2">
                  Applied on {new Date(app.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">CV:</span>{" "}
                  <a
                    href={app.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View CV
                  </a>
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Cover Letter:</span> {app.coverLetter}
                </p>
                <p className="text-sm font-medium">
                  Status:{" "}
                  <span
                    className={
                      app.status === "shortlisted"
                        ? "text-green-600"
                        : app.status === "rejected"
                        ? "text-red-600"
                        : "text-gray-600"
                    }
                  >
                    {app.status || "pending"}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => updateStatus(index, "shortlisted")}
                  disabled={updatingIndex === index}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  {updatingIndex === index ? "Updating..." : "Shortlist"}
                </button>
                <button
                  onClick={() => updateStatus(index, "rejected")}
                  disabled={updatingIndex === index}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                  {updatingIndex === index ? "Updating..." : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No applications yet.</p>
      )}
    </div>
  );
};

export default Applications;


