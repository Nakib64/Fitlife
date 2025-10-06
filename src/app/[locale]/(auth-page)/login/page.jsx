"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { Mail, Facebook, Loader2 } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [loginData, setLoginData] = useState({ email: "", password: "" });
	const [attemptsLeft, setAttemptsLeft] = useState(null);
	const [isLocked, setIsLocked] = useState(false);
	const searchParams = useSearchParams();
	const [showPassword, setShowPassword] = useState(false);
	const callbackUrl = searchParams.get("callbackUrl") || "/";

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
				// Check if error contains attempts left
				const match = res.error.match(/(\d+)\s+attempt/);
				if (match) {
					setAttemptsLeft(Number(match[1]));
				}

				// Check if account is locked
				if (res.error.toLowerCase().includes("locked")) {
					setIsLocked(true);
				}

				if (res.error === "OTP_SENT") {
					// store email/password temporarily in session storage so verify page can finalize login
					sessionStorage.setItem("otpEmail", loginData.email);
					sessionStorage.setItem("otpPassword", loginData.password);
					// optionally set a short ttl timestamp
					sessionStorage.setItem("otpCreatedAt", Date.now().toString());

					// redirect to verify page
					router.push(`/verify-otp?email=${encodeURIComponent(loginData.email)}`);
				} else {
					toast.error(res.error || "Invalid credentials, please try again.");
				}
			} else {
				toast.success("Login successful!");
				setAttemptsLeft(null);
				setIsLocked(false);
				router.push(callbackUrl);
			}
		} finally {
			setIsLoading(false);
		}
	};

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

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-50">
			<div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl space-y-6">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
					<p className="text-sm text-gray-500 mt-1">
						Login to continue your journey
					</p>
				</div>

				<form className="space-y-4" onSubmit={handleLoginSubmit}>
					<div>
						<Label>Email</Label>
						<Input
							type="email"
							placeholder="your@email.com"
							value={loginData.email}
							onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
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
								className="pr-10" // extra space for the icon
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

					{(attemptsLeft !== null || isLocked) && (
						<div className="w-full p-4 bg-red-50">
							{attemptsLeft !== null && !isLocked && (
								<p className="text-sm text-red-500 mt-1">
									{attemptsLeft} attempt{attemptsLeft > 1 ? "s" : ""} left before account
									is locked.
								</p>
							)}

							{isLocked && (
								<p className="text-sm text-red-500 mt-1">
									Your account is temporarily locked. Please try again later.
								</p>
							)}
						</div>
					)}

					<Button
						type="submit"
						className="w-full bg-green-700 hover:bg-green-800"
						disabled={isLoading}
					>
						{isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
						{isLoading ? "Login in..." : "Login"}
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
					<Button
						variant="outline"
						className="w-full flex items-center justify-center gap-2"
						onClick={() => signIn("facebook")}
					>
						<Facebook className="h-4 w-4 text-blue-600" />
						Continue with Facebook
					</Button>
				</div>

				{/* Sign Up link */}
				<p className="text-center text-sm text-gray-500">
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
