import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

export default function MiniProgressRadial({ value, color }) {
  const data = [{ name: "progress", value, fill: color }];
  return (
    <div className="w-14 h-14 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="90%"
          outerRadius="100%"
          barSize={6}
          data={data}
          startAngle={90}
          endAngle={450}
        >
          <RadialBar dataKey="value" background={{ fill: "#e5e7eb" }} />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill={color} className="text-xs font-semibold">
            {value}%
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
