"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import meditationLottie from "../../../../../public/lottie/meditation.json";
import breathingLottie from "../../../../../public/lottie/breathing.json";
import focusLottie from "../../../../../public/lottie/focus.json";

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState("");
  const [activeFullScreen, setActiveFullScreen] = useState(false);

  const mainBgClass =
    "bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white";

  const tools = [
    { key: "meditation", title: "Mindful Minute", description: "A guided 60-second meditation with ambient sound", lottie: meditationLottie },
    { key: "breathing", title: "Breathing Technique", description: "Guided Box Breathing exercise for relaxation", lottie: breathingLottie },
    { key: "focus", title: "Focus Mode", description: "Start a focus session with optional background music", lottie: focusLottie },
  ];

  return (
    <div className={`relative min-h-screen flex flex-col items-center transition-colors duration-500 ${mainBgClass}`}>
      
      {/* BACKDROP BLUR WHEN MODAL ACTIVE */}
      <AnimatePresence>
        {activeFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-30"
          />
        )}
      </AnimatePresence>

      <h1 className="text-3xl md:text-4xl font-extrabold text-[#67DA2C] mt-4 mb-8 text-center z-10 relative">
        Wellness Tools
      </h1>

      <div className="flex flex-col gap-8 w-full max-w-6xl z-10 px-4 md:px-10">
        {tools.map((tool) => (
          <ToolCard
            key={tool.key}
            title={tool.title}
            description={tool.description}
            lottie={tool.lottie}
            onStart={() => { setActiveTool(tool.key); setActiveFullScreen(true); }}
          />
        ))}
      </div>

      {/* FULLSCREEN MODAL */}
      <AnimatePresence>
        {activeTool === "meditation" && activeFullScreen && (
          <MeditationFullScreen close={() => { setActiveTool(""); setActiveFullScreen(false); }} />
        )}
        {activeTool === "breathing" && activeFullScreen && (
          <BreathingFullScreen close={() => { setActiveTool(""); setActiveFullScreen(false); }} />
        )}
        {activeTool === "focus" && activeFullScreen && (
          <FocusFullScreen close={() => { setActiveTool(""); setActiveFullScreen(false); }} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* =============================
   TOOL CARD (20% bigger Lottie)
============================= */
function ToolCard({ lottie, title, description, onStart }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 md:p-6 gap-4 md:gap-6 border border-gray-200 dark:border-gray-700 transition-all duration-500"
    >
      <div className="w-48 h-48 md:w-60 md:h-60 flex items-center justify-center">
        <Lottie animationData={lottie} loop style={{ width: "100%", height: "100%" }} />
      </div>
      <div className="flex-1 flex flex-col gap-2 md:gap-3 text-center md:text-left">
        <h2 className="text-xl md:text-2xl font-bold text-[#67DA2C]">{title}</h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">{description}</p>
        <button
          onClick={onStart}
          className="mt-2 px-5 md:px-6 py-2 bg-[#67DA2C] text-white rounded-xl shadow hover:scale-105 transition-transform font-semibold text-sm md:text-base"
        >
          Start
        </button>
      </div>
    </motion.div>
  );
}

/* =============================
   FULL SCREEN MODAL (STYLISH & GLASSMORPHIC)
============================= */
function FullScreenModal({ lottie, extra, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 overflow-auto"
    >
      {/* DARK STYLISH BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-black opacity-90 backdrop-blur-2xl" />
      
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Glassmorphic Lottie container */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="w-80 h-80 md:w-[36rem] md:h-[36rem] rounded-3xl shadow-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20"
        >
          <Lottie animationData={lottie} loop style={{ width: "100%", height: "100%" }} />
        </motion.div>

        <div className="flex flex-col gap-4 md:gap-6 items-center md:items-start text-center md:text-left z-10">
          {extra}
          {children}
        </div>
      </div>
    </motion.div>
  );
}

/* =============================
   MEDITATION FULLSCREEN
============================= */
function MeditationFullScreen({ close }) {
  const TOTAL_TIME = 60;
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [running, setRunning] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/meditation.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    if (running) audioRef.current.play();
    return () => audioRef.current?.pause();
  }, []);

  useEffect(() => {
    if (audioRef.current) running ? audioRef.current.play() : audioRef.current.pause();
  }, [running]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => prev <= 1 ? (clearInterval(interval), audioRef.current?.pause(), 0) : prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  return (
    <FullScreenModal lottie={meditationLottie}>
      <div className="text-3xl md:text-5xl font-extrabold text-[#67DA2C]">{timeLeft}s</div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setRunning(r => !r)}
        className="px-10 py-3 bg-[#67DA2C] text-white rounded-2xl shadow-xl font-bold text-lg md:text-2xl"
      >
        {running ? "Pause" : "Resume"}
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={close}
        className="mt-4 px-8 py-3 bg-red-600 text-white rounded-2xl shadow-xl font-bold text-lg md:text-2xl"
      >
        Exit
      </motion.button>
    </FullScreenModal>
  );
}

/* =============================
   BREATHING FULLSCREEN
============================= */
function BreathingFullScreen({ close }) {
  const TOTAL_TIME = 60;
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [running, setRunning] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/breathing.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    if (running) audioRef.current.play();
    return () => audioRef.current?.pause();
  }, []);

  useEffect(() => {
    if (audioRef.current) running ? audioRef.current.play() : audioRef.current.pause();
  }, [running]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => prev <= 1 ? (clearInterval(interval), audioRef.current?.pause(), 0) : prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  return (
    <FullScreenModal lottie={breathingLottie}>
      <div className="text-3xl md:text-5xl font-extrabold text-[#67DA2C]">{timeLeft}s</div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setRunning(r => !r)}
        className="px-10 py-3 bg-[#67DA2C] text-white rounded-2xl shadow-xl font-bold text-lg md:text-2xl"
      >
        {running ? "Pause" : "Resume"}
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={close}
        className="mt-4 px-8 py-3 bg-red-600 text-white rounded-2xl shadow-xl font-bold text-lg md:text-2xl"
      >
        Exit
      </motion.button>
    </FullScreenModal>
  );
}

/* =============================
   FOCUS FULLSCREEN
============================= */
function FocusFullScreen({ close }) {
  const TOTAL_TIME = 25*60;
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [running, setRunning] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/focus.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;
    if (running) audioRef.current.play();
    return () => audioRef.current?.pause();
  }, []);

  useEffect(() => {
    if (audioRef.current) running ? audioRef.current.play() : audioRef.current.pause();
  }, [running]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => prev <= 0 ? 0 : prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <FullScreenModal lottie={focusLottie}>
      <div className="text-3xl md:text-5xl font-extrabold text-[#67DA2C]">{`${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`}</div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setRunning(r => !r)}
        className="px-10 py-3 bg-[#67DA2C] text-white rounded-2xl shadow-xl font-bold text-lg md:text-2xl"
      >
        {running ? "Pause" : "Resume"}
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={close}
        className="mt-4 px-8 py-3 bg-red-600 text-white rounded-2xl shadow-xl font-bold text-lg md:text-2xl"
      >
        Exit
      </motion.button>
    </FullScreenModal>
  );
}
