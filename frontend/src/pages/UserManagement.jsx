import React, { useEffect, useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users"); // backend route to get all users
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const updateRole = async (id, role) => {
    setMessage("");
    try {
      const res = await fetch(`/api/users/${id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();

      if (res.ok) {
        setUsers((prev) =>
          prev.map((user) => (user._id === id ? { ...user, role } : user))
        );
        setMessage(`✅ Role updated to "${role}"`);
      } else {
        setMessage(`❌ Error: ${data.message || "Failed to update role"}`);
      }
    } catch (err) {
      console.error("Error updating role:", err);
      setMessage("❌ Server error. Please try again later.");
    }
  };

  const deleteUser = async (id) => {
    setMessage("");
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
        setMessage("✅ User deleted successfully");
      } else {
        setMessage(`❌ Error: ${data.message || "Failed to delete user"}`);
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setMessage("❌ Server error. Please try again later.");
    }
  };

  if (loading) {
    return <p className="text-center py-20 text-gray-500">Loading users...</p>;
  }

  return (
    <div className="pt-20 max-w-6xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">User Management</h1>

      {message && (
        <div className="mb-6 text-center font-semibold text-red-600">{message}</div>
      )}

      {users.length > 0 ? (
        <div className="space-y-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow rounded-lg p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold text-red-600">{user.username}</h2>
                <p className="text-gray-700">{user.email}</p>
                <p className="text-sm font-medium">
                  Role:{" "}
                  <span className="text-gray-600">{user.role || "user"}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateRole(user._id, "user")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Set User
                </button>
                <button
                  onClick={() => updateRole(user._id, "recruiter")}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Set Recruiter
                </button>
                <button
                  onClick={() => updateRole(user._id, "admin")}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Set Admin
                </button>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default UserManagement;
