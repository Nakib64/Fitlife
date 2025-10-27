import React from "react";

export default function GoalProgressCard({ title, value, color }) {
  return (
    <div className="p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <p className="text-2xl font-bold mb-1" style={{ color }}>{value}%</p>
      <p className="text-sm font-semibold text-gray-800 dark:text-white mb-2">{title}</p>
      <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
        <div className="h-1.5 rounded-full" style={{ width: `${value}%`, backgroundColor: color }}></div>
      </div>
    </div>
  );
}
