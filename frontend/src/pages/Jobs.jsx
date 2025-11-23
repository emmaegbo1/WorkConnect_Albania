// src/pages/Jobs.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data);

        const featuredRes = await fetch("/api/jobs/featured");
        const featuredData = await featuredRes.json();
        setFeatured(featuredData);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <p className="text-center py-20 text-gray-500">Loading jobs...</p>;

  return (
    <div className="pt-20 max-w-6xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Jobs</h1>

      {/* Featured Jobs */}
      {featured.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Featured Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((job) => (
              <Link
                key={job._id}
                to={`/jobs/${job._id}`}
                className="p-6 bg-white shadow rounded hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-red-600">{job.title}</h3>
                <p className="text-gray-700">{job.company}</p>
                <p className="text-gray-500">{job.location}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All Jobs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <Link
            key={job._id}
            to={`/jobs/${job._id}`}
            className="p-6 bg-white shadow rounded hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-red-600">{job.title}</h3>
            <p className="text-gray-700">{job.company}</p>
            <p className="text-gray-500">{job.location}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
