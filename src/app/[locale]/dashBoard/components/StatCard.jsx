import React from "react";
import Counter from "./Counter";
import MiniProgressRadial from "./MiniProgressRadial";

export default function StatCard({ title, value, unit, color, percentChange, progressValue }) {
  const isPositive = percentChange >= 0;
  const percentColor = isPositive ? "text-teal-500" : "text-red-500";

  return (
    <div className="p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h2 className="text-sm font-medium text-gray-500 mb-2">{title}</h2>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            <Counter end={value} duration={1.5} />{unit}
          </p>
          <div className="flex items-center mt-1">
            <span className={`text-sm font-semibold ${percentColor} mr-2`}>
              {percentChange}%
            </span>
            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
              <div
                className="h-1.5 rounded-full"
                style={{ width: `${Math.min(100, progressValue)}%`, backgroundColor: color }}
              ></div>
            </div>
          </div>
        </div>
        <MiniProgressRadial value={progressValue} color={color} />
      </div>
    </div>
  );
}
