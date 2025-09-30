"use client";

import React, { useState } from "react";
import { FaBell, FaMoon, FaSun, FaSearch } from "react-icons/fa";

export default function DashboardNavbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white dark:bg-neutral-800 p-4 shadow-md transition-colors duration-300">
      {/* Left: Title & Breadcrumbs */}
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Dashboard
        </h1>
        <nav className="text-sm text-gray-500 dark:text-gray-400">
          Home / Dashboard
        </nav>
      </div>

      {/* Middle: Search Bar */}
      <div className="flex-1 mx-4 hidden sm:flex items-center">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
            <FaSearch />
          </span>
          <input
            type="text"
            aria-label="Search"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-neutral-700 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
      </div>

      {/* Right: Icons & Avatar */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
        >
          <FaBell className="text-gray-600 dark:text-gray-300" />
          <span className="absolute top-1 right-1 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Theme Toggle */}
        <button
          aria-label="Toggle Theme"
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
        >
          {darkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-gray-600" />
          )}
        </button>

        {/* Avatar */}
        <div className="relative">
          <button
            onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
            className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            A
          </button>

          {/* Avatar Dropdown */}
          {avatarMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 shadow-lg rounded-md overflow-hidden z-50">
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700">
                Profile
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700">
                Settings
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
