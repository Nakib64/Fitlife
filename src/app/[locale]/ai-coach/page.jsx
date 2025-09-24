"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRobot, FaUser, FaPaperPlane, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AICoachPage() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hi! I’m your AI Coach. Ask me anything about workouts, nutrition, or motivation!",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const router = useRouter();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // 👇 Mock AI reply (replace with WebSocket / AI API)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "💡 That’s a great question! I’ll tailor advice to your fitness plan once connected to AI backend.",
        },
      ]);
    }, 1000);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f9f3] text-gray-700">
      {/* Header */}
      <header className="bg-green-600 text-white py-4 shadow-md relative">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FaRobot /> AI Fitness Coach
          </h1>
          <p className="text-md opacity-90">Real-time fitness guidance</p>
        </div>

        {/* Close (X) Button */}
        <button
          onClick={() => router.back()}
          className="absolute right-6 top-4 text-white hover:text-gray-200 text-xl"
        >
          <FaTimes />
        </button>
      </header>

      {/* Chat Window */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 max-w-5xl mx-auto w-full">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-end gap-2 max-w-xs sm:max-w-sm md:max-w-md ${
                  msg.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center shadow ${
                    msg.sender === "user" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {msg.sender === "user" ? <FaUser /> : <FaRobot />}
                </div>
                {/* Message Bubble */}
                <div
                  className={`px-4 py-2 rounded-2xl shadow text-sm sm:text-base ${
                    msg.sender === "user"
                      ? "bg-green-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Box */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Ask your AI Coach..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-green-600 text-white px-5 py-2 rounded-full shadow hover:bg-green-700 transition"
          >
            <FaPaperPlane />
          </button>
        </div>
      </footer>
    </div>
  );
}
