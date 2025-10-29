"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { Mail, Loader2, Eye, EyeOff } from "lucide-react";

export default function Login() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [loginData, setLoginData] = useState({ email: "", password: "" });
	const [showPassword, setShowPassword] = useState(false);
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/";

	// 🔹 Example admin credentials list
	const adminAccounts = [
		{ role: "Admin", email: "sabbirhossain8721@gmail.com", password: "sabbir" },
	];

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await signIn("credentials", {
				redirect: false,
				email: loginData.email,
				password: loginData.password,
			});

			if (res?.error) {
				toast.error("Invalid credentials, please try again.");
			} else {
				toast.success("Login successful!");
				router.push(callbackUrl);
			}
		} finally {
			setIsLoading(false);
		}
	};

	// 🔹 Handle Google login
	const handleGoogleLogin = async () => {
		const res = await signIn("google", {
			redirect: false,
			callbackUrl,
		});

		if (res?.error) {
			toast.error("Google login failed. Please try again.");
		} else {
			toast.success("Login successful!");
			router.push(res.url || callbackUrl);
		}
	};

	// 🔹 Handle table row click to autofill credentials
	const handleAutofill = (email, password) => {
		setLoginData({ email, password });
		toast.info("Admin credentials filled.");
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-50">
			<div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl space-y-6">
				{/* Header */}
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
					<p className="text-sm text-gray-500 mt-1">
						Login to continue your journey
					</p>
				</div>

				{/* Login Form */}
				<form className="space-y-4" onSubmit={handleLoginSubmit}>
					<div>
						<Label>Email</Label>
						<Input
							type="email"
							placeholder="your@email.com"
							value={loginData.email}
							onChange={(e) =>
								setLoginData({ ...loginData, email: e.target.value })
							}
							required
						/>
					</div>

					<div>
						<Label>Password</Label>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								placeholder="••••••••"
								value={loginData.password}
								onChange={(e) =>
									setLoginData({ ...loginData, password: e.target.value })
								}
								required
								className="pr-10"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
							>
								{showPassword ? (
									<EyeOff className="h-5 w-5" />
								) : (
									<Eye className="h-5 w-5" />
								)}
							</button>
						</div>
						<div className="text-right mt-1">
							<Link
								href="/reset-password"
								className="text-sm text-green-700 hover:underline"
							>
								Forgot Password?
							</Link>
						</div>
					</div>

					<Button
						type="submit"
						className="w-full bg-green-700 hover:bg-green-800"
						disabled={isLoading}
					>
						{isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
						{isLoading ? "Logging in..." : "Login"}
					</Button>
				</form>

				{/* Divider */}
				<div className="flex items-center gap-2 my-4">
					<div className="h-px bg-gray-300 flex-1" />
					<span className="text-xs text-gray-400">OR</span>
					<div className="h-px bg-gray-300 flex-1" />
				</div>

				{/* Social Login Buttons */}
				<div className="space-y-2">
					<Button
						variant="outline"
						className="w-full flex items-center justify-center gap-2"
						onClick={handleGoogleLogin}
					>
						<Mail className="h-4 w-4 text-red-500" />
						Continue with Google
					</Button>
				</div>

				{/* 🔹 Admin Credentials Table */}
				<div className="mt-6">
					<h3 className="text-sm font-semibold text-gray-600 mb-2">
						Quick Admin Login
					</h3>
					<div className="overflow-hidden rounded-lg border border-gray-200">
						<table className="min-w-full text-sm">
							<thead className="bg-gray-100">
								<tr>
									<th className="px-4 py-2 text-left font-medium text-gray-700">
										Role
									</th>
									<th className="px-4 py-2 text-left font-medium text-gray-700">
										Email
									</th>
								</tr>
							</thead>
							<tbody>
								{adminAccounts.map((admin, idx) => (
									<tr
										key={idx}
										onClick={() =>
											handleAutofill(admin.email, admin.password)
										}
										className="cursor-pointer hover:bg-green-50 transition-colors"
									>
										<td className="px-4 py-2 text-gray-700 font-medium">
											{admin.role}
										</td>
										<td className="px-4 py-2 text-gray-500">
											{admin.email}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<p className="text-xs text-gray-400 mt-2">
						Click a row to autofill login fields.
					</p>
				</div>

				{/* Signup Link */}
				<p className="text-center text-sm text-gray-500 mt-4">
					Don’t have an account?{" "}
					<Link
						href="/signup"
						className="text-green-700 font-medium hover:underline"
					>
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
}
