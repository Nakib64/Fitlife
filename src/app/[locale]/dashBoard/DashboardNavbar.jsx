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
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useDashboardTheme } from "@/context/DashboardThemeContext";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function DashboardNavbar({ onMenuClick }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { darkMode, setDarkMode } = useDashboardTheme();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const paths = pathname.split("/").filter(Boolean);
    const crumbs = paths.map((p, idx) => ({
      label: p.charAt(0).toUpperCase() + p.slice(1),
      href: "/" + paths.slice(0, idx + 1).join("/"),
    }));
    setBreadcrumbs(crumbs);
  }, [pathname]);

  const dropdownRef = useRef(null);
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
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 lg:hidden z-60"
        >
          <FaBars size={20} />
        </button>

        <div className="flex flex-col">
          <nav className="text-sm text-gray-500 dark:text-gray-400 flex gap-2">
            {breadcrumbs.map((crumb, idx) => (
              <span
                key={idx}
                onClick={() => router.push(crumb.href)}
                className="cursor-pointer hover:underline hover:text-lime-600 dark:hover:text-lime-400 transition"
              >
                {crumb.label}
                {idx < breadcrumbs.length - 1 && " /"}
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        <button className="relative text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <FaBell size={20} />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>

        <button className="relative text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <FaEnvelope size={20} />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
        </button>

        <button
          onClick={toggleDarkMode}
          className="text-gray-500 hover:text-yellow-400 dark:hover:text-yellow-300 transition"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>

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
