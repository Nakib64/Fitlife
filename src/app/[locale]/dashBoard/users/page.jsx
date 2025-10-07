"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
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

  // Ban/unban handler
  const toggleBan = async (userId, currentStatus) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBanned: !currentStatus }),
      });
      if (!res.ok) throw new Error("Failed to update user");
      toast.success(currentStatus ? "User unbanned" : "User banned");
      // update local state
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isBanned: !currentStatus } : u
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Banned</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                {user.isBanned ? "Yes" : "No"}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => toggleBan(user._id, user.isBanned)}
                  className={`px-3 py-1 rounded ${
                    user.isBanned
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {user.isBanned ? "Unban" : "Ban"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
