"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaBars,
  FaBell,
  FaEnvelope,
  FaUserCircle,
  FaSun,
  FaMoon,
  FaSearch,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useDashboardTheme } from "@/context/DashboardThemeContext";

export default function DashboardNavbar({ onMenuClick }) {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { darkMode, setDarkMode } = useDashboardTheme();

  const dropdownRef = useRef(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`sticky top-0 z-50 flex items-center justify-between px-4 lg:px-8 py-3 shadow-md border-b transition-all duration-300 ${
        darkMode
          ? "bg-neutral-950 text-gray-200 border-neutral-800"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      {/* --- Left Section: Menu + Search --- */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 lg:hidden"
        >
          <FaBars size={20} />
        </button>

        <div className="relative hidden md:block">
          <FaSearch
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <input
            type="text"
            placeholder="Search..."
            className={`pl-10 pr-4 py-2 rounded-lg text-sm border outline-none transition-colors duration-200 ${
              darkMode
                ? "bg-neutral-900 border-neutral-800 text-gray-300 placeholder-gray-500"
                : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400"
            }`}
          />
        </div>
      </div>

      {/* --- Right Section: Icons + Profile --- */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button className="relative text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <FaBell size={20} />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>

        {/* Messages */}
        <button className="relative text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <FaEnvelope size={20} />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="text-gray-500 hover:text-yellow-400 dark:hover:text-yellow-300 transition"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 focus:outline-none"
          >
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt="User"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
            ) : (
              <FaUserCircle size={28} className="text-gray-500" />
            )}
          </button>

          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50 ${
                darkMode
                  ? "bg-neutral-900 border-neutral-800 text-gray-200"
                  : "bg-white border-gray-200 text-gray-800"
              }`}
            >
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">
                  Settings
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer text-red-500">
                  Logout
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
