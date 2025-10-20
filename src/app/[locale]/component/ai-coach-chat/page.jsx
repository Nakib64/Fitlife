"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRobot, FaUser, FaPaperPlane, FaTimes } from "react-icons/fa";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
console.log(SOCKET_SERVER_URL);
export default function AICoachChat({ onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I’m your AI Coach. Ask me anything about workouts, nutrition, or motivation!",
    },
  ]); 
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // socket setup
  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);
    socketRef.current = socket;

    socket.on("aiMessage", (reply) => {
      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
      setLoading(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    socketRef.current.emit("userMessage", input);

    setInput("");
    setLoading(true);
  }

  return (
    <div className="flex flex-col h-full bg-[#f0f9f3] text-gray-700">
      {/* Header */}
      <header className="bg-green-600 text-white py-3 px-4 flex justify-between items-center shadow-md">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <FaRobot /> Mentra
        </h1>
        <button onClick={onClose} className="text-white hover:text-gray-200 text-xl">
          <FaTimes />
        </button>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex items-end gap-2 max-w-[75%] ${
                msg.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {/* Avatar */}
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center shadow ${
                  msg.sender === "user" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {msg.sender === "user" ? <FaUser /> : <FaRobot />}
              </div>

              {/* Bubble */}
              <div
                className={`px-3 py-2 rounded-2xl shadow text-sm whitespace-pre-line ${
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
        {loading && (
          <div className="text-center text-gray-500 text-xs animate-pulse">
            AI Fitness Coach is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input */}
      <footer className="bg-white border-t border-gray-200 p-3 flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
          placeholder="Ask your AI Coach..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className={`px-4 py-2 rounded-full shadow flex items-center justify-center ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {loading ? "..." : <FaPaperPlane />}
        </button>
      </footer>
    </div>
  );
}
