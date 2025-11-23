// src/pages/Dashboard.jsx
import React from "react";

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold text-gray-800">User Dashboard</h2>
      <p className="text-gray-600 mt-2">
        Welcome to your personal space. Here you can manage your profile, view
        job opportunities, and track applications.
      </p>

      {/* Example sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="p-6 bg-white shadow rounded">
          <h3 className="text-xl font-semibold">My Profile</h3>
          <p className="text-gray-600 mt-2">
            Update your personal details and CV.
          </p>
        </div>
        <div className="p-6 bg-white shadow rounded">
          <h3 className="text-xl font-semibold">Job Applications</h3>
          <p className="text-gray-600 mt-2">
            Track the status of your submitted applications.
          </p>
        </div>
      </div>
    </div>
  );
}
