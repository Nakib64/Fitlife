import React from "react";
import Counter from "./Counter";

export default function SmallStatCard({ title, value, unit, change, color, sign }) {
  const isPositive = sign === "+";
  const percentColor = isPositive ? "text-teal-500" : "text-red-500";

  return (
    <div className="p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <div className="flex items-center justify-between mt-1">
        <p className="text-2xl font-bold text-gray-900 dark:text-white" style={{ color }}>
          <Counter end={value} duration={1.5} />{unit}
        </p>
        <span className={`text-xs font-semibold ${percentColor} p-1 rounded-full`}>
          {sign}{change}%
        </span>
      </div>
    </div>
  );
}
