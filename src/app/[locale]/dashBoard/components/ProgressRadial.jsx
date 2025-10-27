import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

export default function ProgressRadial({ title, percentage, color, label }) {
  const data = [{ name: "progress", value: percentage, fill: color }];
  return (
    <div className="p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{title}</h2>
      <div className="w-full h-48 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="80%"
            outerRadius="95%"
            barSize={20}
            data={data}
            startAngle={-270}
            endAngle={90}
          >
            <RadialBar dataKey="value" fill={color} cornerRadius={10} />
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-4xl font-extrabold" fill={color}>
              {percentage}%
            </text>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-500 mt-2 text-center">{label}</p>
    </div>
  );
}
    