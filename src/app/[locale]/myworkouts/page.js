"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import WorkoutModal from "../component/workout/WorkoutModal";

export default function Home() {
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeWeek, setActiveWeek] = useState(1);
  const [daysPerWeek, setDaysPerWeek] = useState(3); // default, updated after form

  const generateWorkout = async (userData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/AIWorkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      setWorkoutPlan(data.plan || []);
      setDaysPerWeek(userData.days_per_week || 3);
      setActiveWeek(1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Group plan into weeks
  const weeks = [];
  if (workoutPlan.length > 0) {
    for (let i = 0; i < 4; i++) {
      weeks.push(workoutPlan.slice(i * daysPerWeek, i * daysPerWeek + daysPerWeek));
    }
  }

  // 🌈 Colorful Loading Component
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-300">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-28 h-28 bg-gradient-to-tr from-green-400 to-blue-500 rounded-full flex items-center justify-center text-5xl shadow-lg"
        >
          
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 1.5 }}
          className="mt-6 text-3xl font-extrabold text-white text-center animate-pulse"
        >
          🔥 Crafting Your Ultimate AI Workout Plan… 💪
        </motion.p>
        <p className="mt-2 text-white text-lg text-center">Get ready to crush your goals! 🚀</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Hero Section */}
      {workoutPlan.length === 0 && (
        <div className="flex flex-col items-center mt-12 space-y-4 text-center">
          <div className="text-7xl animate-bounce">🏋️‍♂️💪</div>
          <h1 className="text-4xl font-extrabold">Welcome to Your AI Workout</h1>
          <p className="text-gray-700 max-w-md text-lg">
            Generate your personalized workout plan step by step 📝
          </p>
          <p className="text-gray-500">Your fitness journey starts here 🚀</p>
        </div>
      )}

      {/* Modal Trigger */}
      <div className="flex justify-center mt-8">
        <WorkoutModal onGenerate={generateWorkout} />
      </div>

      {/* Motivational Section */}
      {workoutPlan.length === 0 && (
        <div className="mt-12 flex flex-col items-center space-y-4 text-center">
          <div className="text-6xl">🔥⚡</div>
          <p className="text-gray-600 max-w-md">
            Stay consistent! Your AI plan adapts as you log progress 🏃‍♂️
          </p>
          <div className="text-6xl">🕒🎯</div>
          <p className="text-gray-500">Select session times and track your workouts 💪</p>
        </div>
      )}

      {/* Generated Workout */}
      {workoutPlan.length > 0 && (
        <div className="mt-12">
          {/* Week Tabs */}
          <div className="flex justify-center gap-3 mb-6 flex-wrap">
            {weeks.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveWeek(idx + 1)}
                className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                  activeWeek === idx + 1
                    ? "bg-green-500 text-white shadow-lg scale-105"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Week {idx + 1} {activeWeek === idx + 1 && "🔥"}
              </button>
            ))}
          </div>

          {/* Exercises for Active Week */}
          {weeks[activeWeek - 1].map((day, i) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6 mb-4 border border-gray-100 hover:shadow-lg"
            >
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                🗓️ {day.day}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {day.exercises.map((ex, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col bg-green-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="text-lg font-semibold">{ex.name} 🏋️‍♂️</span>
                    <span className="text-gray-600 mt-1">Sets: {ex.sets}</span>
                    <span className="text-gray-600">Reps: {ex.reps}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
