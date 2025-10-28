"use client";
import React from "react";

export default function SummaryCards({ total, completed, progress }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      <div className="bg-white dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-lg p-6 text-center transition-colors duration-500">
        <h3 className="text-lg font-semibold mb-2">Total Exercises</h3>
        <p className="text-3xl font-bold">{total}</p>
      </div>
      <div className="bg-white dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-lg p-6 text-center transition-colors duration-500">
        <h3 className="text-lg font-semibold mb-2">Completed</h3>
        <p className="text-3xl font-bold text-green-500">{completed}</p>
      </div>
      <div className="bg-white dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-lg p-6 text-center transition-colors duration-500">
        <h3 className="text-lg font-semibold mb-2">Progress</h3>
        <p className="text-3xl font-bold text-blue-500">{progress}%</p>
      </div>
    </div>
  );
}
