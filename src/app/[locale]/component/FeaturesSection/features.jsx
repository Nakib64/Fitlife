"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaDumbbell,
  FaUtensils,
  FaChartLine,
  FaBullseye,
  FaClipboardCheck,
  FaRobot,
  FaGamepad,
  FaSpa,
  FaGlobe,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUser className="text-3xl" />,
    title: "User Profile & Biometric Data",
    description:
      "Create your personal profile with age, weight, height, activity level, and fitness goals. Biometric data like steps, heart rate, and calories can also be synced. This foundation helps AI generate tailored fitness and wellness plans just for you.",
    color: "bg-pink-500",
  },
  {
    icon: <FaDumbbell className="text-3xl" />,
    title: "AI-Powered Workout Recommendations",
    description:
      "Receive daily or weekly workout routines designed by AI, including home and gym exercises. Your plan adapts automatically as you log workouts, ensuring gradual progress while preventing injury and workout fatigue.",
    color: "bg-indigo-500",
  },
  {
    icon: <FaUtensils className="text-3xl" />,
    title: "AI-Based Nutrition & Diet Suggestions",
    description:
      "Get customized meal plans with exact calorie and nutrient breakdowns. The system suggests alternatives based on your dietary needs, such as vegetarian, low-carb, or high-protein, helping you stay healthy without sacrificing variety.",
    color: "bg-green-500",
  },
  {
    icon: <FaChartLine className="text-3xl" />,
    title: "Progress Tracking & Analytics",
    description:
      "Track your journey with interactive charts showing weight changes, calories burned, workout frequency, and nutrition trends. These insights keep you motivated by making progress visible and measurable.",
    color: "bg-yellow-500",
  },
  {
    icon: <FaBullseye className="text-3xl" />,
    title: "Goal Setting & Achievement System",
    description:
      "Set specific goals like losing 5kg, building muscle, or improving stamina. The system monitors your performance, adjusts your plan, and rewards you with digital badges when milestones are achieved, making fitness fun and rewarding.",
    color: "bg-purple-500",
  },
  {
    icon: <FaClipboardCheck className="text-3xl" />,
    title: "Workout & Meal Logging System",
    description:
      "Easily log workouts and meals you complete each day. The AI continuously learns from your input and updates your fitness and meal plans in real-time, keeping them relevant to your lifestyle and progress.",
    color: "bg-teal-500",
  },
  {
    icon: <FaRobot className="text-3xl" />,
    title: "AI Chat Assistant (Fitness Bot)",
    description:
      "A built-in chatbot acts as your personal trainer and nutritionist. Ask quick questions like 'What to eat after a workout?' or 'How many pushups should I do today?' and get instant AI-powered advice.",
    color: "bg-red-500",
  },
  {
    icon: <FaGamepad className="text-3xl" />,
    title: "Gamification & Rewards",
    description:
      "Stay motivated with fun features like daily streaks, achievement badges, and motivational quotes. The gamified approach turns fitness into an engaging challenge rather than a boring routine.",
    color: "bg-blue-500",
  },
  {
    icon: <FaSpa className="text-3xl" />,
    title: "Mindfulness & Wellness Section",
    description:
      "Beyond fitness, focus on your overall well-being with guided breathing exercises, meditation tips, stress management advice, and sleep hygiene guidance for a healthier lifestyle.",
    color: "bg-fuchsia-500",
  },
  {
    icon: <FaGlobe className="text-3xl" />,
    title: "Multi-language Support",
    description:
      "Switch seamlessly between English and regional languages for a personalized experience. This makes the app more inclusive and comfortable for users from different backgrounds.",
    color: "bg-gray-700",
  },
];

function FeaturesSection() {
  return (
    <section className="relative py-10 bg-[#f3f4f7] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold tracking-wide 
  bg-gradient-to-r from-gray-800 via-slate-700 to-blue-600 
  text-transparent bg-clip-text animate-gradient"
        >
          Premium Features
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-4 mb-7 text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          Everything you need to achieve your fitness & wellness goals, all in
          one place.
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="relative h-full rounded-2xl bg-white shadow-md hover:shadow-xl transition-all"
            >
              <div className="h-full bg-white rounded-2xl p-8 flex items-start gap-5">
                {/* Floating Icon */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className={`flex-shrink-0 p-4 rounded-full text-white shadow-md ${feature.color}`}
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <div className="text-left space-y-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
