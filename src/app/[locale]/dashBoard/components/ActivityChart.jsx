import React from "react";
import { AreaChart, Area, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomToolTip";

const activityTrendData = [
  { day: "Mon", Workouts: 5, "Calories Burned": 500 },
  { day: "Tue", Workouts: 7, "Calories Burned": 650 },
  { day: "Wed", Workouts: 4, "Calories Burned": 400 },
  { day: "Thu", Workouts: 8, "Calories Burned": 700 },
  { day: "Fri", Workouts: 6, "Calories Burned": 550 },
  { day: "Sat", Workouts: 9, "Calories Burned": 800 },
  { day: "Sun", Workouts: 5, "Calories Burned": 450 },
];

export default function ActivityChart() {
  return (
    <div className="p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Weekly Activity</h2>
      </div>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activityTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#666' }} />
            <YAxis yAxisId="left" orientation="left" stroke="#a1a1aa" tick={{ fontSize: 10 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#a1a1aa" tick={{ fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            <Area yAxisId="left" type="monotone" dataKey="Workouts" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} name="Workouts"/>
            <Line yAxisId="right" type="monotone" dataKey="Calories Burned" stroke="#14b8a6" strokeWidth={2} dot={false} name="Calories Burned"/>
            <Legend iconSize={10} wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} align="center" verticalAlign="bottom"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
