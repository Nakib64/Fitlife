"use client";

import { useRouter, usePathname } from "next/navigation";
import { FaComments } from "react-icons/fa";

export default function ChatButton() {
  const router = useRouter();
  const pathname = usePathname();

  // 🔹 Hide button if already on AI Coach page
  if (pathname === "/ai-coach") return null;

  return (
    <button
      onClick={() => router.push("/ai-coach")}
      className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg 
                 hover:bg-green-700 transition z-50 flex items-center justify-center"
      aria-label="AI Coach"
      title="AI Coach"
    >
      <FaComments size={24} />
    </button>
  );
}
