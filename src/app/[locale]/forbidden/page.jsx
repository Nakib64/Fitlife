"use client";
import Link from "next/link";
import { Lock } from "lucide-react";

export default function Forbidden() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 bg-red-100 rounded-full">
            <Lock className="w-12 h-12 text-red-600" />
          </div>
        </div>

        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Access Forbidden
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, you don’t have permission to view this page.  
          Please contact your administrator if you believe this is a mistake.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Go Home
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            Login with another account
          </Link>
        </div>
      </div>
    </div>
  );
}
