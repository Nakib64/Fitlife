"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const UserInfo = () => {
	const { data: session } = useSession();

	if (!session) {
		return (
			<>
				<Link
					href="/signup"
					className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
				>
					Login
				</Link>
			</>
		);
	}

	return (
		<div className="flex items-center">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="capitalize">
						{session.user?.name || "User"}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-40">
					<DropdownMenuItem
						onClick={() => signOut({ callbackUrl: "/" })}
						className="cursor-pointer text-red-500"
					>
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserInfo;