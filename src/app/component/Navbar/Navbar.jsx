"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import UserInfo from "../userInfo/UserInfo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "My Workouts", href: "/myworkouts" },
    { name: "My Meals", href: "/meals" },
    // { name: "Progress Tracker", href: "/progressTracker" },
    { name: "Wellness", href: "/wellness" },
    { name: "Achievements", href: "/achievements" },
    // { name: "AI Coach", href: "/ai-coach" },
    { name: "About", href: "/about" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-10 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] border rounded-full shadow-xl shadow-cyan-900/10 bg-white z-50"
    >
      <div className="flex items-center justify-between px-6 h-22">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/Logo/logo.png"
            height={90}
            width={190}
            alt="Logo"
            className="object-contain"
          />
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center lg:space-x-16 xl:space-x-20">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="xl:text-xl font-semibold text-gray-800 hover:text-neutral-400 transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right User/Login */}
        <div className="hidden md:flex">
          <UserInfo />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="focus:outline-none rounded-full p-2 bg-gray-100 hover:bg-gray-200 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="md:hidden bg-white shadow-md overflow-hidden rounded-b-2xl"
      >
        <div className="flex flex-col items-center space-y-4 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-green-600 transition text-lg"
            >
              {link.name}
            </Link>
          ))}
          <UserInfo />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
