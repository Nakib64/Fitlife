"use client";

import React, { useState } from "react";
import { FaBell, FaMoon, FaSun, FaSearch } from "react-icons/fa";
import {
	Home,
	User,
	BarChart2,
	Activity,
	Coffee,
	Newspaper,
	Menu,
	Users,
} from "lucide-react";
import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation"; // use your localized Link
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function DashboardNavbar() {
	const [darkMode, setDarkMode] = useState(false);
	const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
	const [open, setOpen] = useState(false);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
		document.documentElement.classList.toggle("dark");
	};

	const links = [
		{ label: "Dashboard", icon: <Home size={20} />, href: "/dashBoard" },
		{ label: "All Users", icon: <Users size={20} />, href: "/dashBoard/users" },
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
	];

	return (
		<header className="sticky top-0 z-50 flex items-center justify-between bg-white dark:bg-neutral-800 p-4 shadow-md transition-colors duration-300">
			{/* Left: Menu (for mobile) + Title */}
			<div className="flex items-center gap-3">
				{/* Mobile Drawer Button */}
				<div className="lg:hidden">
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<button className="p-2 rounded-md bg-indigo-600 text-white">
								<Menu size={22} />
							</button>
						</SheetTrigger>

						{/* Drawer Sidebar */}
						<SheetContent side="left" className="p-0 w-64 dark:bg-neutral-900">
							<SheetHeader className="p-4 border-b dark:border-neutral-700">
								<SheetTitle className="text-indigo-600 dark:text-indigo-400">
									FitLife
								</SheetTitle>
								<SheetDescription className="text-gray-500 dark:text-gray-400">
									Navigate your dashboard
								</SheetDescription>
							</SheetHeader>

							<nav className="flex flex-col p-3 space-y-2">
								{links.map((link, i) => (
									<Link
										key={i}
										href={link.href}
										onClick={() => setOpen(false)} // close drawer on navigation
										className="flex items-center gap-3 p-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-neutral-800 transition"
									>
										<span className="text-indigo-600 dark:text-indigo-400">
											{link.icon}
										</span>
										<span>{link.label}</span>
									</Link>
								))}
							</nav>
						</SheetContent>
					</Sheet>
				</div>

				{/* Page Title */}
				<div className="flex flex-col">
					<h1 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
						Dashboard
					</h1>
					<nav className="text-sm text-gray-500 dark:text-gray-400">
						Home / Dashboard
					</nav>
				</div>
			</div>

			{/* Middle: Search Bar */}
			<div className="flex-1 mx-4 hidden sm:flex items-center">
				<div className="relative w-full max-w-md">
					<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
						<FaSearch />
					</span>
					<input
						type="text"
						aria-label="Search"
						placeholder="Search..."
						className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-neutral-700 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
					/>
				</div>
			</div>

			{/* Right: Icons & Avatar */}
			<div className="flex items-center gap-4">
				{/* Notifications */}
				<button
					aria-label="Notifications"
					className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
				>
					<FaBell className="text-gray-600 dark:text-gray-300" />
					<span className="absolute top-1 right-1 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
				</button>

				{/* Theme Toggle */}
				<button
					aria-label="Toggle Theme"
					onClick={toggleDarkMode}
					className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
				>
					{darkMode ? (
						<FaSun className="text-yellow-400" />
					) : (
						<FaMoon className="text-gray-600" />
					)}
				</button>

				{/* Avatar */}
				<div className="relative">
					<button
						onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
						className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
					>
						A
					</button>

					{avatarMenuOpen && (
						<div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 shadow-lg rounded-md overflow-hidden z-50">
							<button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700">
								Profile
							</button>
							<button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700">
								Settings
							</button>
							<button
								className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700"
								onClick={() => signOut({ callbackUrl: "/" })}
							>
								Logout
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
