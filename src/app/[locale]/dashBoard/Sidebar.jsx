"use client";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  BarChart2,
  Award,
  Newspaper,
  User2,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useMemo, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { IoMdStopwatch } from "react-icons/io";
import { FiX } from "react-icons/fi";

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role || "user";

  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = useMemo(() => {
    const baseLinks = [
      { label: "Dashboard", icon: <Home size={20} />, href: "/dashBoard" },
      { label: "Progress Tracker", icon: <BarChart2 size={20} />, href: "/dashBoard/progressTracker" },
      { label: "Tools", icon: <IoMdStopwatch size={20} />, href: "/dashBoard/tools" },
      { label: "Achievements", icon: <Award size={20} />, href: "/dashBoard/achievements" },
      { label: "Home", icon: <User size={20} />, href: "/" },
    ];
    if (role === "admin") {
      baseLinks.splice(1, 0, { label: "Wellness Blog", icon: <Newspaper size={20} />, href: "/dashBoard/wellnessBlog" });
      baseLinks.splice(1, 0, { label: "All Users", icon: <User2 size={20} />, href: "/dashBoard/users" });
    }
    return baseLinks;
  }, [role]);

  const sidebarContent = (
    <>
      {/* Sidebar Header */}
      <div className="p-4 flex items-center gap-3 border-b border-lime-200 dark:border-neutral-700">
        <Home size={28} className={`transition-colors duration-300 ${hovered ? "text-lime-600" : "text-lime-500"}`} />
        <span
          className="text-xl font-bold text-lime-600 whitespace-nowrap transition-all duration-300 ease-in-out"
          style={{
            opacity: hovered || isMobile ? 1 : 0,
            transform: hovered || isMobile ? "translateX(0)" : "translateX(-20px)",
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
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ease-in-out`}
              style={{
                background: active ? "#65a30d" : hovered ? "rgba(132, 204, 22, 0.08)" : "transparent",
                color: active ? "#fff" : "var(--text-color, #374151)",
                fontWeight: active ? 600 : 500,
              }}
            >
              <span
                className="transition-colors duration-300"
                style={{ color: active ? "#fff" : hovered ? "#65a30d" : "#6b7280" }}
              >
                {link.icon}
              </span>
              <span
                className="whitespace-nowrap transition-all duration-300 ease-in-out font-medium"
                style={{
                  opacity: hovered || isMobile ? 1 : 0,
                  transform: hovered || isMobile ? "translateX(0)" : "translateX(-20px)",
                }}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative hidden lg:flex flex-col overflow-hidden bg-gradient-to-b from-lime-50 to-lime-50 dark:from-neutral-900 dark:to-neutral-950 shadow-lg group"
        style={{
          transition: "width 0.4s",
          width: hovered ? "220px" : "64px",
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden`}>
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={() => setMobileOpen(false)}
        ></div>

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-lime-50 dark:bg-neutral-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4 p-2 text-gray-700 dark:text-gray-300"
            onClick={() => setMobileOpen(false)}
          >
            <FiX size={24} />
          </button>
          {sidebarContent}
        </div>
      </div>
    </>
  );
}
