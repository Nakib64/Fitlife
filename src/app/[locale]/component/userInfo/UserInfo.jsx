"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/navigation";

const UserInfo = () => {
	const { data: session } = useSession();

	if (!session) {
		return (
			<>
				<Link
					href="/login"
					className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
				>
					Login
				</Link>
			</>
		);
	}

	return (
		<div className="flex items-center">
			<Link href={'/dashBoard'}>
				<Button variant="outline" className="capitalize">
						{session.user?.name || "User"}
					</Button>
			</Link>
		</div>
	);
};

export default UserInfo;