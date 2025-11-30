// src/pages/Reports.jsx
import React, { useEffect, useState } from "react";

export default function Reports() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    featuredJobs: 0,
    totalApplications: 0,
    applicationsByStatus: {
      pending: 0,
      shortlisted: 0,
      rejected: 0,
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/jobs");
        const jobs = await res.json();

        let totalApplications = 0;
        let applicationsByStatus = { pending: 0, shortlisted: 0, rejected: 0 };

        jobs.forEach((job) => {
          totalApplications += job.applications?.length || 0;
          job.applications?.forEach((app) => {
            applicationsByStatus[app.status] =
              (applicationsByStatus[app.status] || 0) + 1;
          });
        });

        setStats({
          totalJobs: jobs.length,
          featuredJobs: jobs.filter((j) => j.featured).length,
          totalApplications,
          applicationsByStatus,
        });
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) {
    return <p className="text-center py-20 text-gray-500">Loading reports...</p>;
  }

  return (
    <div className="pt-24 bg-gray-50 min-h-screen px-6">
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
          Admin <span className="text-red-600">Reports</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900">Total Jobs</h3>
            <p className="text-3xl font-bold text-red-600">{stats.totalJobs}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900">Featured Jobs</h3>
            <p className="text-3xl font-bold text-red-600">{stats.featuredJobs}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900">Total Applications</h3>
            <p className="text-3xl font-bold text-red-600">{stats.totalApplications}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900">Applications by Status</h3>
            <ul className="text-gray-700 mt-2">
              <li>Pending: <span className="font-bold">{stats.applicationsByStatus.pending}</span></li>
              <li>Shortlisted: <span className="font-bold">{stats.applicationsByStatus.shortlisted}</span></li>
              <li>Rejected: <span className="font-bold">{stats.applicationsByStatus.rejected}</span></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}