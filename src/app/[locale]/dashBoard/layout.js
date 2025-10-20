"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";
import { DashboardThemeProvider, useDashboardTheme } from "@/context/DashboardThemeContext";

// Inner wrapper that applies dark/light classes
function DashboardContent({ children }) {
  const { darkMode } = useDashboardTheme();
  const [mobileOpen, setMobileOpen] = useState(false); // manage mobile sidebar

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen bg-gray-100 dark:bg-neutral-950 transition-colors duration-300">
        {/* Pass mobile state to Sidebar */}
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        <div className="flex-1 flex flex-col overflow-auto">
          {/* Pass toggle function to Navbar */}
          <DashboardNavbar onMenuClick={() => setMobileOpen(true)} />
          <main className="flex-1 p-2 lg:p-4">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <DashboardThemeProvider>
      <DashboardContent>{children}</DashboardContent>
    </DashboardThemeProvider>
  );
}
