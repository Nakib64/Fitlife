"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React, { useState, useEffect } from "react";
import UserInfo from "../userInfo/UserInfo";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("navbar");

  const navLinks = [
    { name: t("myWorkouts"), href: "/myworkouts" },
    { name: t("myMeals"), href: "/meals" },
    { name: t("wellness"), href: "/wellness" },
    { name: t("achievements"), href: "/achievements" },
    { name: t("aiCoach"), href: "/ai-coach" },
    { name: t("about"), href: "/about" },
    { name: t("dashboard"), href: "/dashBoard" },
  ];

  const hiddenPaths = [
    "/signup",
    "/login",
    "/reset-password",
    "/verify-otp",
    "/dashBoard",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (hiddenPaths.some((p) => pathname.includes(p))) {
    return <></>;
  }

  return (
    <div
      className={`w-full bg-white z-50 ${
        scrolled
          ? "fixed top-0 left-0 border-b border-gray-200"
          : "relative"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-20 lg:h-16">
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src="/Logo/logo.png"
            height={80}
            width={160}
            alt="Logo"
            className="object-contain h-12 sm:h-14 md:h-16 lg:h-20 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-800 hover:text-green-500 text-sm lg:text-base xl:text-lg"
            >
              {link.name}
            </Link>
          ))}
          <UserInfo />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col items-center space-y-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600 text-base sm:text-lg"
              >
                {link.name}
              </Link>
            ))}
            <UserInfo />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
