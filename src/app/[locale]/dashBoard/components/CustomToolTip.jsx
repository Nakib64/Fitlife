import React from "react";

export default function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 rounded-lg shadow-xl border border-gray-200 text-sm bg-white dark:bg-gray-800">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((p, idx) => (
          <p key={idx} className="text-gray-600" style={{ color: p.color }}>
            {p.dataKey}: <span className="font-bold">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}
