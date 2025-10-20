"use client";
import React, { useState, useEffect } from "react";
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

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetClose,
} from "@/components/ui/sheet";
import {
	Home,
	User,
	BarChart2,
	Award,
	Newspaper,
	User2,
	Menu,
} from "lucide-react";
import { IoMdStopwatch } from "react-icons/io";
import { Link } from "@/i18n/navigation";
import { Button } from "@headlessui/react";

export default function DashboardNavbar() {
	const { data: session } = useSession();
	const pathname = usePathname();
	const { darkMode, setDarkMode } = useDashboardTheme();

	const [isMobile, setIsMobile] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 1024);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const toggleDarkMode = () => setDarkMode(!darkMode);

	const role = session?.user?.role || "user";

	const links = [
		{ label: "Dashboard", icon: <Home size={20} />, href: "/dashBoard" },
		{
			label: "Progress Tracker",
			icon: <BarChart2 size={20} />,
			href: "/dashBoard/progressTracker",
		},
		{
			label: "Tools",
			icon: <IoMdStopwatch size={20} />,
			href: "/dashBoard/tools",
		},
		{
			label: "Achievements",
			icon: <Award size={20} />,
			href: "/dashBoard/achievements",
		},
		{ label: "Home", icon: <User size={20} />, href: "/" },
	];

	if (role === "admin") {
		links.splice(1, 0, {
			label: "Wellness Blog",
			icon: <Newspaper size={20} />,
			href: "/dashBoard/wellnessBlog",
		});
		links.splice(1, 0, {
			label: "All Users",
			icon: <User2 size={20} />,
			href: "/dashBoard/users",
		});
	}

	return (
		<>
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
				<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
					<SheetTrigger asChild>
						<button className="lg:hidden text-gray-700 focus:outline-none">
							<Menu size={26} />
						</button>
					</SheetTrigger>

					<SheetContent
						side="left"
						className={`w-64 p-5 ${
							darkMode
								? "bg-neutral-950 text-gray-200 border-neutral-800"
								: "bg-white text-gray-800 border-gray-200"
						}`}
					>
						<SheetHeader className="flex flex-row items-center justify-between mb-6">
							<SheetTitle className="text-lg font-semibold text-gray-800"></SheetTitle>
							<SheetClose asChild></SheetClose>
						</SheetHeader>

						<div className="flex flex-col h-full">
							<div className="p-4 flex items-center gap-3 border-b border-lime-200 dark:border-neutral-700">
								<Home size={28} className="text-lime-600" />
								<span className="text-xl font-bold text-lime-600 whitespace-nowrap">
									FitLife
								</span>
							</div>

							<nav className="flex-1 px-2 py-4 space-y-1">
								{links.map((link, i) => {
									const active = pathname === link.href;
									return (
										<Link
											key={i}
											href={link.href}
											className={`flex  items-center gap-3 p-3  transition-all duration-300 ease-in-out`}
										>
											<span className="transition-colors duration-300">{link.icon}</span>
											<span className="whitespace-nowrap transition-all duration-300 ease-in-out font-medium">
												{link.label}
											</span>
										</Link>
									);
								})}
							</nav>
						</div>
					</SheetContent>
				</Sheet>

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

					{session?.user?.image ? (
						<img
							src={session.user.image}
							alt="User"
							className="w-8 h-8 rounded-full border border-gray-300"
						/>
					) : (
						<FaUserCircle size={28} className="text-gray-500" />
					)}
				</div>
			</motion.header>
		</>
	);
}
