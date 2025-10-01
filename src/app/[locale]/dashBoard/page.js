"use client";
import React from "react";
import { FaDumbbell, FaFire, FaRunning } from "react-icons/fa";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CountUp from "react-countup";

const data = [
  { day: "Mon", calories: 200 },
  { day: "Tue", calories: 400 },
  { day: "Wed", calories: 300 },
  { day: "Thu", calories: 500 },
  { day: "Fri", calories: 250 },
  { day: "Sat", calories: 600 },
  { day: "Sun", calories: 450 },
];

export default function Page() {
  return (
    <div className="space-y-10 p-8 bg-gray-50 dark:bg-neutral-900 min-h-screen">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        📊 Fitness Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center w-14 h-14">
              <FaDumbbell size={24} className="text-indigo-600 dark:text-indigo-200" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Workouts</h2>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                <CountUp end={25} duration={2} />
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center w-14 h-14">
              <FaFire size={24} className="text-green-600 dark:text-green-200" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Calories Burned</h2>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                <CountUp end={1250} duration={2} separator="," />
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center w-14 h-14">
              <FaRunning size={24} className="text-orange-600 dark:text-orange-200" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Days</h2>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                <CountUp end={12} duration={2} />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Calories Burned This Week
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="calories"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 6 }}
            />
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
            <XAxis dataKey="day" tick={{ fill: "#555", fontWeight: "bold" }} />
            <YAxis tick={{ fill: "#555", fontWeight: "bold" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderRadius: "8px",
                border: "none",
                color: "#fff",
                padding: "10px",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
