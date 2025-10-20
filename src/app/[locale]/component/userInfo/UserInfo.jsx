"use client";

import { useSession } from "next-auth/react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const UserInfo = () => {
	const { data: session } = useSession();

	if (!session) {
		return (
			<Link
				href="/login"
				className="px-5 py-2 bg-lime-500 text-white font-medium rounded-full hover:bg-lime-600 transition-all duration-300 shadow-sm hover:shadow-md"
			>
				Login
			</Link>
		);
	}

	const firstName = session.user?.name?.split(" ")[0] || "User";
	//   const fullName = session.user?.name || "Go to Dashboard";

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Link href="/dashBoard">
						<div className="flex items-center gap-1 font-bold bg-white border border-gray-200 rounded-full px-1.5 py-1.5 cursor-pointer hover:bg-lime-50 hover:border-lime-300 transition-all duration-300 shadow-sm hover:shadow-md">
							{session.user?.image ? (
								<Image
									src={session.user.image}
									alt={firstName}
									width={36}
									height={36}
									className="rounded-full object-cover border border-lime-300"
								/>
							) : (
								<div className="w-9 h-9 hidden rounded-full bg-lime-500 text-white lg:flex items-center justify-center font-semibold">
									{firstName.charAt(0).toUpperCase()}
								</div>
							)}
							<span className=" text-gray-800 hidden lg:block">
								{firstName}
							</span>
						</div>
					</Link>
				</TooltipTrigger>
				<TooltipContent
					side="bottom"
					className="bg-lime-100 text-gray-800 border border-lime-300 shadow-md font-medium"
				>
					<p>Dashboard</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default UserInfo;
