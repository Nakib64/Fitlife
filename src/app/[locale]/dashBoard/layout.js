"use client";
import React from "react";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-neutral-950 max-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <DashboardNavbar />
        <main className="flex-1 p-2 lg:p-4">{children}</main>
      </div>
    </div>
  );
}
