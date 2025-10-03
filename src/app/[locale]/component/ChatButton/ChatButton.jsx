"use client";

import { useState } from "react";
import { FaComments } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AICoachChat from "../ai-coach-chat/page";

export default function ChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button (always visible) */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg 
                   hover:bg-green-700 transition z-30 flex items-center justify-center"
        aria-label="AI Coach"
        title="AI Coach"
      >
        <FaComments size={24} />
      </button>

      {/* Chat Window with Animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 sm:bottom-24 sm:right-6 sm:inset-auto 
                       w-full h-full sm:w-[400px] sm:h-[700px] 
                       bg-white rounded-none sm:rounded-2xl 
                       shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <AICoachChat onClose={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
