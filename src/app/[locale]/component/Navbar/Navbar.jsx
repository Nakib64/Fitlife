"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React, { useState, useEffect } from "react";
import UserInfo from "../userInfo/UserInfo";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("navbar");
  const { data: session } = useSession();

  const navLinks = [
    { name: t("myWorkouts"), href: "/myworkouts" },
    { name: t("myMeals"), href: "/meals" },
    { name: t("wellness"), href: "/wellness" },
    { name: t("about"), href: "/about" },
  ];

  const hiddenPaths = [
    "/signup",
    "/login",
    "/reset-password",
    "/verify-otp",
    "/dashBoard",
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (hiddenPaths.some((p) => pathname.includes(p))) return null;

  return (
    <nav
      className={`w-full bg-white z-50 transition-all duration-300 ${
        scrolled
          ? "fixed top-0 left-0 shadow-sm border-b border-gray-200"
          : "relative"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2  h-16">
        {/* Left Section: Menu + Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* Logo */}
          <Link href="/">
            <Image
              src="/Logo/logo.png"
              height={50}
              width={120}
              alt="Logo"
              className="object-contain  sm:h-12 md:h-26 w-auto"
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-gray-800 font-medium transition group"
              >
                <span
                  className={`${
                    isActive ? "text-lime-600" : "group-hover:text-lime-500"
                  } transition-colors duration-300`}
                >
                  {link.name}
                </span>
                {/* Underline Animation */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-lime-400 transition-all duration-300 ease-out ${
                    isActive
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            );
          })}
        </div>

        {/* Right: User Info */}
        <div className="flex items-center">
          <UserInfo />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-100">
          <div className="flex flex-col items-center space-y-4 py-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`relative text-gray-700 text-base font-medium transition group ${
                  pathname === link.href ? "text-lime-600" : "hover:text-lime-500"
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-lime-400 transition-all duration-300 ease-out ${
                    pathname === link.href
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
