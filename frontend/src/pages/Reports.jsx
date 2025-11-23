import React, { useEffect, useState } from "react";

const Reports = () => {
  const [stats, setStats] = useState({
    jobs: 0,
    applications: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("/api/reports"); // backend route
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        } else {
          setMessage("❌ Error fetching reports");
        }
      } catch (err) {
        console.error("Error fetching reports:", err);
        setMessage("❌ Server error while loading reports");
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
    <div className="pt-20 max-w-5xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Platform Reports</h1>

      {message && (
        <div className="mb-6 text-center font-semibold text-red-600">{message}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded text-center">
          <h2 className="text-xl font-semibold text-red-600">Jobs Posted</h2>
          <p className="text-3xl font-bold text-gray-800 mt-4">{stats.jobs}</p>
        </div>
        <div className="p-6 bg-white shadow rounded text-center">
          <h2 className="text-xl font-semibold text-red-600">Applications Submitted</h2>
          <p className="text-3xl font-bold text-gray-800 mt-4">{stats.applications}</p>
        </div>
        <div className="p-6 bg-white shadow rounded text-center">
          <h2 className="text-xl font-semibold text-red-600">Users Registered</h2>
          <p className="text-3xl font-bold text-gray-800 mt-4">{stats.users}</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
