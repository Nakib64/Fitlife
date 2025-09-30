"use client";

import React from "react";

import { motion } from "framer-motion";
import {
  FaUser,
  FaWeight,
  FaRunning,
  FaAppleAlt,
  FaWater,
  FaBed,
  FaTrophy,
  FaChartLine,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

export default function Page() {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  // Dummy Data
  const weightData = [
    { week: "Week 1", weight: 72 },
    { week: "Week 2", weight: 71.5 },
    { week: "Week 3", weight: 70.8 },
    { week: "Week 4", weight: 70.2 },
  ];

  const workoutData = [
    { day: "Mon", workouts: 2 },
    { day: "Tue", workouts: 1 },
    { day: "Wed", workouts: 3 },
    { day: "Thu", workouts: 1 },
    { day: "Fri", workouts: 2 },
    { day: "Sat", workouts: 1 },
    { day: "Sun", workouts: 0 },
  ];

  const calorieData = [
    { day: "Mon", intake: 1800, burned: 500 },
    { day: "Tue", intake: 2000, burned: 600 },
    { day: "Wed", intake: 1750, burned: 700 },
    { day: "Thu", intake: 1900, burned: 550 },
    { day: "Fri", intake: 2100, burned: 800 },
    { day: "Sat", intake: 2200, burned: 900 },
    { day: "Sun", intake: 2000, burned: 400 },
  ];

  const macroData = [
    { name: "Protein", value: 120 },
    { name: "Carbs", value: 200 },
    { name: "Fat", value: 70 },
  ];
  const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#e11d48", "#a855f7"];

  const sleepData = [
    { day: "Mon", hours: 7 },
    { day: "Tue", hours: 6.5 },
    { day: "Wed", hours: 8 },
    { day: "Thu", hours: 6 },
    { day: "Fri", hours: 7.5 },
    { day: "Sat", hours: 8.2 },
    { day: "Sun", hours: 7 },
  ];

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      {/* Header */}
      <motion.h1
        className="text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Progress Tracker
      </motion.h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <motion.div
          className="p-6 rounded-2xl shadow-xl border bg-gradient-to-br from-blue-100 to-blue-50 backdrop-blur-lg flex flex-col items-center hover:shadow-2xl transition-all"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <FaUser className="text-4xl mb-3 text-blue-500" />
          <h2 className="text-xl font-semibold">Profile Overview</h2>
          <p className="mt-2 text-center text-gray-600">
            Abid Hasan <br /> Goal: Lose 5kg in 2 months
          </p>
        </motion.div>

        {/* Body Metrics */}
        <motion.div
          className="p-6 rounded-2xl shadow-xl border bg-gradient-to-br from-green-50 to-emerald-100 backdrop-blur-lg hover:shadow-2xl transition-all"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <FaWeight className="text-2xl text-green-600" />
            <h2 className="text-xl font-semibold">Body Metrics</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li>Weight: 72kg → 70.2kg</li>
            <li>BMI: 23.5</li>
            <li>Body Fat: 18%</li>
          </ul>
        </motion.div>

        {/* Workout Progress */}
        <motion.div
          className="p-6 rounded-2xl shadow-xl border bg-gradient-to-br from-orange-50 to-yellow-50 backdrop-blur-lg hover:shadow-2xl transition-all"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <FaRunning className="text-2xl text-orange-500" />
            <h2 className="text-xl font-semibold">Workout Progress</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={workoutData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="workouts" radius={[8, 8, 0, 0]}>
                {workoutData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Nutrition Tracking */}
        <motion.div
          className="p-6 rounded-2xl shadow-xl border bg-gradient-to-br from-red-50 to-pink-100 backdrop-blur-lg hover:shadow-2xl transition-all"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <FaAppleAlt className="text-2xl text-red-500" />
            <h2 className="text-xl font-semibold">Nutrition</h2>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={macroData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {macroData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Habits */}
        <motion.div
          className="p-6 rounded-2xl shadow-xl border bg-gradient-to-br from-sky-50 to-indigo-100 backdrop-blur-lg hover:shadow-2xl transition-all"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <FaWater className="text-2xl text-blue-500" />
            <h2 className="text-xl font-semibold">Habits</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li>💧 Water: 2.5L / 3L</li>
            <li>
              <FaBed className="inline mr-2 text-purple-400" /> Sleep Avg: 7h
            </li>
          </ul>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="p-6 rounded-2xl shadow-xl border bg-gradient-to-br from-yellow-50 to-orange-100 backdrop-blur-lg hover:shadow-2xl transition-all"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <FaTrophy className="text-2xl text-yellow-500" />
            <h2 className="text-xl font-semibold">Achievements</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li>🏅 5-Day Workout Streak</li>
            <li>🔥 Burned 10,000 Calories</li>
            <li>⚡ Fastest 5K Run</li>
          </ul>
        </motion.div>
      </div>

      {/* Full Width Sections */}
      <div className="mt-10 space-y-10">
        {/* Sleep Pattern */}
        <motion.div
          className="p-6 rounded-2xl shadow-xl border bg-gradient-to-br from-purple-50 to-pink-50 backdrop-blur-lg hover:shadow-2xl transition-all"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <FaBed className="text-2xl text-purple-500" />
            <h2 className="text-xl font-semibold">Sleep Pattern</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={sleepData}>
              <defs>
                <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#c084fc" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#8b5cf6"
                fill="url(#colorSleep)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Calorie Intake vs Burned */}
        <motion.div
          className="p-6 rounded-2xl shadow-xl border bg-gradient-to-br from-pink-50 to-rose-100 backdrop-blur-lg hover:shadow-2xl transition-all"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <FaChartLine className="text-2xl text-pink-500" />
            <h2 className="text-xl font-semibold">Calories Intake vs Burned</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={calorieData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="intake" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="burned" stroke="#ef4444" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Weight Progress */}
        <motion.div
          className="p-6 rounded-2xl shadow-xl border bg-gradient-to-br from-green-50 to-emerald-100 backdrop-blur-lg hover:shadow-2xl transition-all"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <FaChartLine className="text-2xl text-green-500" />
            <h2 className="text-xl font-semibold">Weight Progress</h2>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#22c55e" strokeWidth={3} dot={{ r: 6, fill: "#16a34a" }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
