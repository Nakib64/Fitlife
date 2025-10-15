"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaBell, FaMoon, FaSun } from "react-icons/fa";
import {
	Home,
	Users,
	Activity,
	Coffee,
	BarChart2,
	Newspaper,
	Menu,
} from "lucide-react";
import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function DashboardNavbar() {
	const router = useRouter();
	const pathname = usePathname();
	const [darkMode, setDarkMode] = useState(false);
	const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
	const [open, setOpen] = useState(false);

	const session = useSession()
	
	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
		document.documentElement.classList.toggle("dark");
	};

	// Define links
	const links = [
		{ label: "Dashboard", icon: <Home size={18} />, href: "/dashBoard" },
		{ label: "All Users", icon: <Users size={18} />, href: "/dashBoard/users" },
		{
			label: "My Workouts",
			icon: <Activity size={18} />,
			href: "/dashBoard/myworkouts",
		},
		{ label: "My Meals", icon: <Coffee size={18} />, href: "/dashBoard/meals" },
		{
			label: "Progress Tracker",
			icon: <BarChart2 size={18} />,
			href: "/dashBoard/progressTracker",
		},
		{
			label: "Wellness Blog",
			icon: <Newspaper size={18} />,
			href: "/dashBoard/wellnessBlog",
		},
	];

	// Build breadcrumb based on pathname
	const [breadcrumbs, setBreadcrumbs] = useState([]);
	useEffect(() => {
		const paths = pathname.split("/").filter(Boolean);
		const crumbs = paths.map((p, idx) => ({
			label: p.charAt(0).toUpperCase() + p.slice(1),
			href: "/" + paths.slice(0, idx + 1).join("/"),
		}));
		setBreadcrumbs(crumbs);
	}, [pathname]);

	return (
		<header
			className="sticky top-0 z-50 flex items-center justify-between
       bg-gradient-to-b from-gray-200 to-gray-50
      dark:from-neutral-900 dark:to-neutral-950 
      p-4 shadow-md transition-colors"
		>
			{/* Left: Mobile Menu + Page Title */}
			<div className="flex items-center gap-3">
				{/* Mobile Drawer Button */}
				<div className="lg:hidden">
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<button className="p-2 rounded-md bg-lime-600 text-white dark:bg-lime-400 dark:text-black">
								<Menu size={22} />
							</button>
						</SheetTrigger>

						<SheetContent side="left" className="p-0 w-64 dark:bg-neutral-900">
							<SheetHeader className="p-4 border-b dark:border-neutral-700">
								<SheetTitle className="text-lime-600 dark:text-lime-400">
									FitLife
								</SheetTitle>
								<SheetDescription className="text-gray-500 dark:text-gray-400">
									Navigate your dashboard
								</SheetDescription>
							</SheetHeader>

							<nav className="flex flex-col p-3 space-y-2">
								{links.map((link, i) => (
									<button
										key={i}
										onClick={() => {
											router.push(link.href);
											setOpen(false);
										}}
										className="flex items-center gap-3 p-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-lime-100 dark:hover:bg-neutral-800 transition"
									>
										<span className="text-lime-600 dark:text-lime-400">{link.icon}</span>
										<span>{link.label}</span>
									</button>
								))}
							</nav>
						</SheetContent>
					</Sheet>
				</div>

				{/* Page Title + Breadcrumb */}
				<div className="flex flex-col">
					<h1 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
						Dashboard
					</h1>
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

			{/* Right: Notifications, Dark Mode, Profile */}
			<div className="flex items-center gap-4">
				{/* Notifications */}
				<button
					aria-label="Notifications"
					className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
				>
					<FaBell className="text-gray-600 dark:text-gray-300" />
					<span className="absolute top-1 right-1 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
				</button>

				{/* Dark Mode Toggle */}
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

				{/* Profile Avatar */}
				<div className="relative">
					<button
						onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
						className="w-8 h-8 rounded-full flex items-center justify-center bg-lime-600 dark:bg-lime-400 text-white font-bold focus:outline-none focus:ring-2 focus:ring-lime-500 overflow-hidden"
					>
						{session?.data?.user?.image ? (
							<img
								src={session.data.user.image}
								alt="Profile"
								className="w-full h-full object-cover rounded-full"
							/>
						) : (
							session?.data?.user?.name?.[0].toUpperCase() || "U"
						)}
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
