"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const roles = ["user", "premium-user", "controller", "coach"];

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();

      // Sort so that admins appear first
      const sorted = [...data].sort((a, b) => {
        if (a.role === "admin" && b.role !== "admin") return -1;
        if (a.role !== "admin" && b.role === "admin") return 1;
        return 0;
      });

      setUsers(sorted);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Ban / Unban user
  const toggleBan = async (email, currentStatus) => {
    try {
      const res = await fetch("/api/users/ban", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Failed");
      toast.success(data.isBanned ? "User banned" : "User unbanned");

      setUsers((prev) =>
        prev.map((u) =>
          u.email === email ? { ...u, isBanned: data.isBanned } : u
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user ban status");
    }
  };

  // Update user role
  const updateRole = async (email, role) => {
    try {
      const res = await fetch("/api/users/role", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });

      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Failed");

      toast.success(`Role updated to ${role}`);
      setUsers((prev) =>
        prev.map((u) => (u.email === email ? { ...u, role } : u))
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role");
    }
  };

  if (loading) return <p className="p-4 text-gray-500">Loading users...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">All Users</h2>
      <div className="overflow-x-auto bg-white text-center shadow-md rounded-lg">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-green-500 text-gray-700">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>

                {/* Role Dropdown */}
                <td className="border px-4 py-2">
                  {user.role === "admin" ? (
                    <span className="capitalize">{user.role}</span>
                  ) : (
                    <select
                      value={user.role}
                      onChange={(e) => updateRole(user.email, e.target.value)}
                      className="border px-2 py-1 rounded text-sm"
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  )}
                </td>

                <td
                  className={`border px-4 py-2 font-medium ${
                    user.isBanned ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {user.isBanned ? "Banned" : "Active"}
                </td>

                <td className="border px-4 py-2 text-center space-x-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => toggleBan(user.email, user.isBanned)}
                      className={`px-3 py-1 rounded text-white ${
                        user.isBanned
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {user.isBanned ? "Unban" : "Ban"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
