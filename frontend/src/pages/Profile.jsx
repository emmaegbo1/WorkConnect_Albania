// src/pages/Profile.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="pt-24 text-center text-gray-600">
        <h2 className="text-2xl font-bold">You are not logged in</h2>
        <p className="mt-2">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-gray-50 min-h-screen px-6">
      <section className="max-w-3xl mx-auto bg-white shadow rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          My <span className="text-red-600">Profile</span>
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-gray-700 font-semibold">Name</h3>
            <p className="text-gray-900">{user.name}</p>
          </div>

          <div>
            <h3 className="text-gray-700 font-semibold">Email</h3>
            <p className="text-gray-900">{user.email}</p>
          </div>

          <div>
            <h3 className="text-gray-700 font-semibold">Role</h3>
            <p className="text-gray-900 capitalize">{user.role}</p>
          </div>

          {/* Optional: show multiple roles if present */}
          {user.roles && user.roles.length > 1 && (
            <div>
              <h3 className="text-gray-700 font-semibold">Roles</h3>
              <p className="text-gray-900">{user.roles.join(", ")}</p>
            </div>
          )}
        </div>

        {/* Future expansion: jobs applied/posted */}
        <div className="mt-8">
          <h3 className="text-gray-700 font-semibold mb-2">Activity</h3>
          <p className="text-gray-500 italic">
            Jobs applied or posted will appear here in future.
          </p>
        </div>
      </section>
    </div>
  );
}
