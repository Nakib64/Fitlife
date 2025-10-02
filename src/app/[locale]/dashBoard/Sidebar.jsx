"use client";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  BarChart2,
  Activity,
  Coffee,
  Newspaper,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useState } from "react";

const links = [
  { label: "Dashboard", icon: <Home size={20} />, href: "/dashBoard" },
  {
    label: "My Workouts",
    icon: <Activity size={20} />,
    href: "/dashBoard/myworkouts",
  },
  {
    label: "My Meals",
    icon: <Coffee size={20} />,
    href: "/dashBoard/meals",
  },
  {
    label: "Progress Tracker",
    icon: <BarChart2 size={20} />,
    href: "/dashBoard/progressTracker",
  },
    {
  label: "Wellness Blog",
  icon: <Newspaper size={20} />,   
  href: "/dashBoard/wellnessBlog",
},
  { label: "Home", icon: <User size={20} />, href: "/" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);

  return (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex flex-col overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-900 shadow-lg group`}
      style={{
        transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        width: hovered ? "260px" : "64px",
      }}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center gap-3 border-b border-gray-200 dark:border-neutral-700">
        <Home
          size={28}
          className={`transition-colors duration-400 ease-in-out ${
            hovered ? "text-indigo-600" : "text-indigo-500"
          }`}
        />
        <span
          className="text-xl font-bold text-indigo-600 whitespace-nowrap tracking-wide transition-all duration-400 ease-in-out"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-20px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          FitLife
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {links.map((link, i) => {
          const active = pathname === link.href;
          return (
            <Link
              key={i}
              href={link.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-400 ease-in-out group`}
              style={{
                background: active
                  ? "#4f46e5" // Indigo-600
                  : hovered
                  ? "rgba(79, 70, 229, 0.08)"
                  : "transparent",
                color: active ? "#ffffff" : "#374151", // Gray-700
                fontWeight: active ? 600 : 500,
                fontSize: "0.95rem",
              }}
            >
              <span
                className="transition-colors duration-400 ease-in-out"
                style={{
                  color: active ? "#ffffff" : hovered ? "#4f46e5" : "#6b7280",
                  transition: "color 0.4s ease",
                }}
              >
                {link.icon}
              </span>
              <span
                className="whitespace-nowrap transition-all duration-400 ease-in-out font-medium"
                style={{
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? "translateX(0)" : "translateX(-20px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Tooltip for collapsed state */}
      {!hovered && (
        <div className="absolute top-0 left-full ml-2 hidden group-hover:flex flex-col bg-black text-white text-sm rounded py-1 px-2 shadow-lg animate-fade-in">
          {links.map((link, i) => (
            <div
              key={i}
              className="py-1 transition-all duration-300 font-medium"
            >
              {link.label}
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateX(-5px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease forwards;
        }
      `}</style>
    </aside>
  );
}
