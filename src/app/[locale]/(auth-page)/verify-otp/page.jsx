"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2 } from "lucide-react";

const VerifyOTP = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    setIsLoading(true);

    try {
      const body = { email, otp };
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid OTP");
        return;
      }

      // finalize login
      const savedEmail = sessionStorage.getItem("otpEmail");
      const savedPassword = sessionStorage.getItem("otpPassword");

      if (!savedEmail || !savedPassword) {
        toast.error("Missing credentials, try login again.");
        router.push("/login");
        return;
      }

      const finalRes = await signIn("credentials", {
        redirect: false,
        email: savedEmail,
        password: savedPassword,
        otpVerified: true,
      });

      if (finalRes?.error) {
        toast.error(finalRes.error || "Could not sign in");
      } else {
        toast.success("Logged in successfully!");
        sessionStorage.removeItem("otpEmail");
        sessionStorage.removeItem("otpPassword");
        sessionStorage.removeItem("otpCreatedAt");
        router.push("/");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Verify OTP</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter the 6-digit OTP sent to{" "}
            <span className="font-medium">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Didn’t receive the OTP?{" "}
            <button
              onClick={() => toast.info("Resend OTP functionality here")}
              className="text-green-700 font-medium hover:underline"
            >
              Resend
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;
