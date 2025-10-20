"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React, { useState, useEffect } from "react";
import UserInfo from "../userInfo/UserInfo";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("navbar");
  const { data: session } = useSession();

  const navLinks = [
    { name: t("myWorkouts"), href: "/myworkouts" },
    { name: t("myMeals"), href: "/meals" },
    { name: t("Health"), href: "/health-advisor" },
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
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 h-16">
        {/* Left Section: Menu + Logo */}
        <div className="flex items-center ">
          {/* Mobile Menu Drawer */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden text-gray-700 focus:outline-none">
                <Menu size={26} />
              </button>
            </SheetTrigger>

            <SheetContent
              side="bottom"
              className="w-full bg-white border-r border-gray-200 p-5"
            >
              <SheetHeader className="flex flex-row items-center justify-between mb-6">
                <SheetTitle className="text-lg font-semibold text-gray-800">
                  
                </SheetTitle>
                <SheetClose asChild>
                  
                </SheetClose>
              </SheetHeader>

              <div className="flex flex-col space-y-5">
                {navLinks.map((link) => {
                  const isActive = pathname.includes(link.href);
                  return (
                    <SheetClose asChild key={link.name}>
                      <Link
                        href={link.href}
                        className={`relative text-base font-medium transition-colors ${
                          isActive
                            ? "text-lime-600"
                            : "text-gray-700 hover:text-lime-500"
                        }`}
                      >
                        {link.name}
                        <span
                          className={`absolute left-0 -bottom-1 h-[2px] bg-lime-400 transition-all duration-300 ease-out ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        ></span>
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/">
            <Image
              src="/Logo/logo.png"
              height={50}
              width={120}
              alt="Logo"
              className="object-contain sm:h-12 md:h-26 w-auto"
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname.includes(link.href);
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
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            );
          })}
        </div>

        {/* Right: User Info (Always Visible) */}
        <div className="flex items-center">
          <UserInfo />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
