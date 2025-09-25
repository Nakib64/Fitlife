"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Facebook, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function AuthPage() {
	const [tab, setTab] = useState("login");
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/"; // Login state
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});

	// Register state
	const [registerData, setRegisterData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const tabVariants = {
		hidden: { opacity: 0, x: 50 },
		visible: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: -50 },
	};

	// Handle login submit
	const handleLoginSubmit = async (e) => {
		e.preventDefault();
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
	};

	// Handle register submit
	const handleRegisterSubmit = async (e) => {
		e.preventDefault();

		if (registerData.password !== registerData.confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		const res = await fetch("/api/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(registerData),
		});

		if (res.ok) {
			toast.success("Registration successful! Logging in...");
			await signIn("credentials", {
				redirect: false,
				email: registerData.email,
				password: registerData.password,
			});
			router.push("/");
		} else {
			toast.error("Registration failed. Please try again.");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-emerald-700 to-green-900 p-4">
			<motion.div
				initial={{ opacity: 0, y: 50, scale: 0.9 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="w-full max-w-md"
			>
				<Card className="rounded-2xl shadow-2xl border-none bg-white/95 backdrop-blur-xl">
					<CardHeader className="text-center space-y-2">
						<motion.div
							initial={{ rotate: -15, scale: 0 }}
							animate={{ rotate: 0, scale: 1 }}
							transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
							className="flex justify-center"
						>
							<Dumbbell className="h-12 w-12 text-green-700" />
						</motion.div>
						<CardTitle className="text-2xl font-bold text-gray-800">
							Welcome to FitLife
						</CardTitle>
						<p className="text-sm text-gray-500">
							Stay strong. Stay consistent. Login or Sign up below.
						</p>
					</CardHeader>

					<CardContent>
						{/* Tabs */}
						<Tabs value={tab} onValueChange={setTab} className="w-full">
							<TabsList className="grid grid-cols-2 mb-6">
								<TabsTrigger value="login">Login</TabsTrigger>
								<TabsTrigger value="register">Register</TabsTrigger>
							</TabsList>
						</Tabs>

						{/* AnimatePresence for smooth transition */}
						<motion.div layout>
							<AnimatePresence mode="wait">
								{tab === "login" && (
									<motion.div
										key="login"
										layout
										variants={tabVariants}
										initial="hidden"
										animate="visible"
										exit="exit"
										transition={{ duration: 0.4 }}
										className="space-y-4"
									>
										<form className="space-y-4" onSubmit={handleLoginSubmit}>
											<div>
												<Label htmlFor="login-email">Email</Label>
												<Input
													id="login-email"
													type="email"
													placeholder="your@email.com"
													className="mt-1"
													value={loginData.email}
													onChange={(e) =>
														setLoginData({
															...loginData,
															email: e.target.value,
														})
													}
													required
												/>
											</div>
											<div>
												<Label htmlFor="login-password">Password</Label>
												<Input
													id="login-password"
													type="password"
													placeholder="••••••••"
													className="mt-1"
													value={loginData.password}
													onChange={(e) =>
														setLoginData({
															...loginData,
															password: e.target.value,
														})
													}
													required
												/>
											</div>
											<Button
												type="submit"
												className="w-full bg-green-700 hover:bg-green-800"
											>
												Login
											</Button>
										</form>
									</motion.div>
								)}

								{tab === "register" && (
									<motion.div
										key="register"
										layout
										variants={tabVariants}
										initial="hidden"
										animate="visible"
										exit="exit"
										transition={{ duration: 0.4 }}
										className="space-y-4"
									>
										<form className="space-y-4" onSubmit={handleRegisterSubmit}>
											<div>
												<Label htmlFor="name">Full Name</Label>
												<Input
													id="name"
													type="text"
													placeholder="John Doe"
													className="mt-1"
													value={registerData.name}
													onChange={(e) =>
														setRegisterData({
															...registerData,
															name: e.target.value,
														})
													}
													required
												/>
											</div>
											<div>
												<Label htmlFor="register-email">Email</Label>
												<Input
													id="register-email"
													type="email"
													placeholder="your@email.com"
													className="mt-1"
													value={registerData.email}
													onChange={(e) =>
														setRegisterData({
															...registerData,
															email: e.target.value,
														})
													}
													required
												/>
											</div>
											<div>
												<Label htmlFor="register-password">Password</Label>
												<Input
													id="register-password"
													type="password"
													placeholder="••••••••"
													className="mt-1"
													value={registerData.password}
													onChange={(e) =>
														setRegisterData({
															...registerData,
															password: e.target.value,
														})
													}
													required
												/>
											</div>
											<div>
												<Label htmlFor="confirm-password">Confirm Password</Label>
												<Input
													id="confirm-password"
													type="password"
													placeholder="••••••••"
													className="mt-1"
													value={registerData.confirmPassword}
													onChange={(e) =>
														setRegisterData({
															...registerData,
															confirmPassword: e.target.value,
														})
													}
													required
												/>
											</div>
											<Button
												type="submit"
												className="w-full bg-green-700 hover:bg-green-800"
											>
												Register
											</Button>
										</form>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>

						{/* Divider */}
						<motion.div layout className="flex items-center gap-2 my-4">
							<div className="h-px bg-gray-300 flex-1" />
							<span className="text-xs text-gray-400">OR</span>
							<div className="h-px bg-gray-300 flex-1" />
						</motion.div>

						{/* Social Logins */}
						<motion.div layout className="grid gap-2">
							<Button variant="outline" className="w-full flex items-center gap-2">
								<Mail className="h-4 w-4 text-red-500" />
								Continue with Google
							</Button>
							<Button variant="outline" className="w-full flex items-center gap-2">
								<Facebook className="h-4 w-4 text-blue-600" />
								Continue with Facebook
							</Button>
						</motion.div>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
