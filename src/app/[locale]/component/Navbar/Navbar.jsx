"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import UserInfo from "../userInfo/UserInfo";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();
  const pathname = usePathname();
  const t = useTranslations("navbar")
  const navLinks = [
    { name: t("myWorkouts"), href: "/myworkouts" },
    { name: t("myMeals"), href: "/meals" },
    { name: t("wellness"), href: "/wellness" },
    { name: t("achievements"), href: "/achievements" },
    { name: t("aiCoach"), href: "/ai-coach" },
    { name: t("about"), href: "/about" },
    { name: t("dashboard"), href: "/dashBoard" }
  ];

  const hiddenPaths = ["/signup", "/login", "/reset-password", "/verify-otp", "/dashBoard"];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
        controls.start({
          height: "80px", // shrink height
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: { duration: 0.3, ease: "easeInOut" },
        });
      } else {
        setScrolled(false);
        controls.start({
          height: "140px", // initial height
          boxShadow: "0px 0px 0px rgba(0,0,0,0)",
          transition: { duration: 0.3, ease: "easeInOut" },
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  if (hiddenPaths.some((p) => pathname.includes(p))) {
    return <></>
  }

  return (
    <motion.div
      animate={controls}
      initial={{ height: "140px", boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
      className={`w-full bg-white z-50 transition-colors duration-300 ${
        scrolled
          ? "fixed top-0 z-50 left-0 border-b border-gray-200"
          : "relative"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-full">
        {/* Logo with scaling */}
        <Link href={"/"}>
          <motion.div
            animate={{ scale: scrolled ? 0.7 : 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Image
              src="/Logo/logo.png"
              height={100}
              width={180}
              alt="Logo"
              className="object-contain"
            />
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-9">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-800 hover:text-green-500 transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}

          <UserInfo></UserInfo>
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
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={
          isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="md:hidden bg-white shadow-md overflow-hidden"
      >
        <div className="flex flex-col items-center space-y-4 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 transition text-lg"
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Login Button */}
          <UserInfo></UserInfo>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
