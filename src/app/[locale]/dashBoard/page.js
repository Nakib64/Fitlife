"use client";
import React from "react";
import ActivityChart from "./components/ActivityChart";
import StatCard from "./components/StatCard";
import SmallStatCard from "./components/SmallStatCard";
import GoalProgressCard from "./components/GoalProgressCard";
import ProgressRadial from "./components/ProgressRadial";

// --- Color Palette ---
const COLORS = {
  primary: "#6366f1",   // Indigo
  energy: "#ef4444",    // Red
  progress: "#14b8a6",  // Teal
  weight: "#f59e0b",    // Amber
};

// --- Data ---
const mainStats = [
  { title: "New Users Joined", value: 234, unit: "%", color: COLORS.progress, percentChange: 12, progressValue: 58 },
  { title: "Calories Burned", value: 2780, unit: " kcal", color: COLORS.energy, percentChange: 18, progressValue: 92 },
  { title: "Workout Sessions", value: 145, unit: "", color: COLORS.weight, percentChange: 7, progressValue: 72 },
  { title: "Meal Plans Created", value: 34, unit: "", color: COLORS.progress, percentChange: 22, progressValue: 81 },
];

const healthStats = [
  { title: "Calories", value: 2.45, unit: "K", change: 14, color: COLORS.energy, sign: "+" },
  { title: "Workouts", value: 4.76, unit: "K", change: 8, color: COLORS.progress, sign: "+" },
  { title: "Proteins", value: 1.5, unit: "M", change: 15, color: COLORS.primary, sign: "+" },
  { title: "Sleep Hours", value: 7.2, unit: " hrs", change: 12, color: COLORS.weight, sign: "+" },
];

const goalTargets = [
  { title: "Strength Goal", value: 71, color: COLORS.energy },
  { title: "Endurance Goal", value: 54, color: COLORS.progress },
  { title: "Flexibility Goal", value: 32, color: COLORS.weight },
  { title: "Cardio Goal", value: 89, color: COLORS.primary },
];

export default function DashboardPage() {
  const currentGoalPercentage = 75;

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen text-gray-900 dark:text-white font-sans">
      
      {/* --- TOP STAT CARDS --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {mainStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* --- ACTIVITY + GOAL PROGRESS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <div className="lg:col-span-1">
          <ProgressRadial
            title="AI Progress Goal"
            percentage={currentGoalPercentage}
            color={COLORS.progress}
            label="Workout Goal"
          />
        </div>
      </div>

      {/* --- HEALTH METRICS --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {healthStats.map((stat, index) => (
          <SmallStatCard key={index} {...stat} />
        ))}
      </div>

      {/* --- GOAL TRACKER --- */}
      <div className="flex justify-between items-center mt-6 mb-4">
        <h2 className="text-xl font-extrabold text-gray-800 dark:text-white">
          Goal Tracker
        </h2>
        <a href="#" className="text-sm text-gray-500 hover:text-indigo-500">
          View Details
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {goalTargets.map((goal, index) => (
          <GoalProgressCard key={index} {...goal} />
        ))}
      </div>
    </div>
  );
}
