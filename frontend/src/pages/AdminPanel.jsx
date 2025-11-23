// src/pages/AdminPanel.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AdminPanel() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold text-gray-800">Admin Panel</h2>
      <p className="text-gray-600 mt-2">
        Manage users, recruiters, jobs, and platform settings.
      </p>

      {/* Sections with navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* User Management */}
        <Link
          to="/users"
          className="p-6 bg-white shadow rounded hover:shadow-lg transition block"
        >
          <h3 className="text-xl font-semibold">User Management</h3>
          <p className="text-gray-600 mt-2">
            View, edit, or remove users and recruiters.
          </p>
        </Link>

        {/* Job Listings */}
        <Link
          to="/manage-jobs"
          className="p-6 bg-white shadow rounded hover:shadow-lg transition block"
        >
          <h3 className="text-xl font-semibold">Job Listings</h3>
          <p className="text-gray-600 mt-2">
            Approve, edit, or reject job postings submitted by recruiters.
          </p>
        </Link>

        {/* Reports */}
        <Link
          to="/reports"
          className="p-6 bg-white shadow rounded hover:shadow-lg transition block"
        >
          <h3 className="text-xl font-semibold">Reports</h3>
          <p className="text-gray-600 mt-2">
            View analytics on jobs, applications, and users.
          </p>
        </Link>
      </div>
    </div>
  );
}

