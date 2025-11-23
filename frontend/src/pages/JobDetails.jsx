// src/pages/JobDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <p className="text-center py-20 text-gray-500">Loading job details...</p>;
  if (!job) return <p className="text-center py-20 text-gray-500">Job not found.</p>;

  return (
    <div className="pt-20 max-w-4xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
      <p className="text-lg text-gray-700">{job.company}</p>
      <p className="text-gray-500 mb-6">{job.location}</p>
      <p className="text-gray-800 mb-8">{job.description}</p>

      <Link
        to={`/jobs/${job._id}/apply`}
        className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition font-semibold"
      >
        Apply Now
      </Link>
    </div>
  );
};

export default JobDetails;
