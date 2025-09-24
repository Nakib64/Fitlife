"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Mail, Facebook, Loader2 } from "lucide-react";

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) return toast.error("Passwords do not match");
    setIsLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: registerData.name, email: registerData.email.trim(), password: registerData.password })
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error || "Registration failed");
        return;
      }

      // Store credentials only temporarily for OTP flow
      sessionStorage.setItem("otpEmail", registerData.email.trim());
      sessionStorage.setItem("otpPassword", registerData.password);
      sessionStorage.setItem("otpCreatedAt", Date.now().toString());

      // redirect to OTP verify
      router.push(`/verify-otp?email=${encodeURIComponent(registerData.email.trim())}`);
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await signIn("google", {
        redirect: false,
        callbackUrl: "/",
      });

      if (res?.error) {
        toast.error("Google login failed. Please try again.");
      } else {
        toast.success("Login successful!");
        router.push(res.url || "/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-sm text-gray-500 mt-1">
            Join us and start your fitness journey
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleRegisterSubmit}>
          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="John Doe"
              value={registerData.name}
              onChange={(e) =>
                setRegisterData({ ...registerData, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
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
            disabled={isLoading}
          >
             {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
            {isLoading ? "Signin in..." : "Register"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-4">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        {/* Social Logins */}
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

        {/* Login redirect */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-green-700 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
