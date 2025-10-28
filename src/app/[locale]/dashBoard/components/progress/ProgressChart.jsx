"use client";
import React from "react";
import { Doughnut, Line } from "react-chartjs-2";

export default function ProgressCharts({ doughnutData, doughnutOptions, lineData, lineOptions, progress }) {
  return (
    <div className="bg-white dark:bg-gray-800/80 rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center transition-colors duration-500">
      <h2 className="text-2xl font-bold mb-6 text-center">🌀 Overall Progress</h2>
      <div className="relative w-56 h-56 flex items-center justify-center">
        <Doughnut data={doughnutData} options={doughnutOptions} />
        <div className="absolute text-center">
          <p className="text-4xl font-extrabold text-green-500">{progress}%</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">Completed</p>
        </div>
      </div>
      <div className="mt-10 w-full h-64">
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
}
