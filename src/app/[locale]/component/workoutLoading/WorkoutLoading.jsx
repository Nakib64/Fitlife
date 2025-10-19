"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Base word
const WORD = "FitLife";
const LETTERS = WORD.split("");
const WORD_LENGTH = LETTERS.length;

// Messages
const messages = [
  "Generating workout...",
  "Analyzing your fitness data...",
  "Customizing exercises for you...",
  "Almost done...",
  "Preparing your personalized plan..."
];

const AnimatedLetter = ({ char, index, swapStep }) => {
  let finalIndex = index;

  if (index === 0) {
    finalIndex = swapStep;
  } else if (index <= swapStep && index > 0) {
    finalIndex = index - 1;
  }

  const transformX = finalIndex - index;

  return (
    <span
      className="inline-block relative transition-transform duration-500 ease-in-out"
      style={{ transform: `translateX(${transformX}ch)`, width: "1ch" }}
    >
      {char}
    </span>
  );
};

export default function FitLifeLoader() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [swapStep, setSwapStep] = useState(0);

  // Message cycling every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Letter swap every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      setSwapStep((prev) => (prev + 1) % (WORD_LENGTH + 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full ">
      {/* Animated title */}
      <div className="flex text-lime-400 text-6xl font-extrabold mb-8">
        {LETTERS.map((char, index) => (
          <AnimatedLetter key={index} char={char} index={index} swapStep={swapStep} />
        ))}
      </div>

      {/* Animated messages using framer-motion */}
      <div className="h-10 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={messageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className=" w-full text-lime-400 text-xl font-bold text-center flex items-center justify-center h-full"
          >
            {messages[messageIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
