"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaRulerVertical,
  FaWeight,
  FaBullseye,
  FaRunning,
  FaDumbbell,
  FaFireAlt,
  FaHeartbeat,
  FaBicycle,
  FaTrophy,
  FaSmile,
  FaAppleAlt,
  FaHeart,
} from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Myworkout() {
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "",
    goal: "",
    activity: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);

    setTimeout(() => {
      let exercises = [];
      if (formData.goal === "weight_loss") {
        exercises = [
          { name: "Running", desc: "Boost stamina & burn calories", icon: <FaRunning className="text-red-500 text-5xl" /> },
          { name: "Jump Rope", desc: "Great cardio & fat burning", icon: <FaFireAlt className="text-orange-500 text-5xl" /> },
          { name: "HIIT", desc: "High intensity intervals", icon: <FaHeartbeat className="text-pink-500 text-5xl" /> },
        ];
      } else if (formData.goal === "weight_gain") {
        exercises = [
          { name: "Bench Press", desc: "Chest, shoulders & triceps", icon: <FaDumbbell className="text-blue-500 text-5xl" /> },
          { name: "Deadlift", desc: "Back, legs & grip strength", icon: <FaRunning className="text-gray-700 text-5xl" /> },
          { name: "Squats", desc: "Legs & core power", icon: <FaFireAlt className="text-yellow-500 text-5xl" /> },
        ];
      } else {
        exercises = [
          { name: "Cycling", desc: "Cardio endurance & legs", icon: <FaBicycle className="text-purple-500 text-5xl" /> },
          { name: "Push-ups", desc: "Upper body & core strength", icon: <FaDumbbell className="text-gray-700 text-5xl" /> },
          { name: "Plank", desc: "Core stability & abs", icon: <FaBullseye className="text-indigo-500 text-5xl" /> },
        ];
      }

      setSuggestions(exercises);
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  const weeklyPlan = [
    { day: "Mon", task: "Cardio", icon: <FaRunning className="text-red-500" /> },
    { day: "Tue", task: "Strength", icon: <FaDumbbell className="text-blue-500" /> },
    { day: "Wed", task: "HIIT", icon: <FaHeartbeat className="text-pink-500" /> },
    { day: "Thu", task: "Rest", icon: <FaSmile className="text-yellow-500" /> },
    { day: "Fri", task: "Cardio", icon: <FaRunning className="text-red-500" /> },
    { day: "Sat", task: "Strength", icon: <FaDumbbell className="text-blue-500" /> },
    { day: "Sun", task: "Yoga/Stretch", icon: <FaBicycle className="text-purple-500" /> },
  ];

  const bmi =
    formData.height && formData.weight
      ? (formData.weight / (formData.height / 100) ** 2).toFixed(1)
      : 0;

  const cardBg = "bg-gradient-to-br from-[#F4F9F9] to-[#E8F2F2]";

  return (
    <div className="min-h-screen py-12 px-5 font-sans">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-6"
      >
        <h1 className="text-6xl font-extrabold tracking-tight text-black mb-6">
          Build Your Ultimate Workout
        </h1>
        <p className="text-lg text-black leading-relaxed">
          Personalize your fitness plan. Enter your details, pick your goal, and let’s transform your journey.
        </p>
      </motion.div>

      {/* Motivational Quote */}
      <motion.div className="my-8 text-center">
        <p className="text-xl font-semibold text-black italic">
          The only bad workout is the one you didn’t do.
        </p>
      </motion.div>

      {/* Info Cards */}
      {!submitted && !loading && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`${cardBg} p-4 rounded-xl shadow-lg text-center`}>
            <FaFireAlt className="text-orange-500 text-2xl mx-auto mb-2" />
            <h3 className="font-bold text-lg mb-1 text-black">Burn Calories</h3>
          </div>
          <div className={`${cardBg} p-4 rounded-xl shadow-lg text-center`}>
            <FaDumbbell className="text-blue-500 text-2xl mx-auto mb-2" />
            <h3 className="font-bold text-lg mb-1 text-black">Build Strength</h3>
          </div>
          <div className={`${cardBg} p-4 rounded-xl shadow-lg text-center`}>
            <FaHeartbeat className="text-pink-500 text-2xl mx-auto mb-2" />
            <h3 className="font-bold text-lg mb-1 text-black">Improve Health</h3>
          </div>
        </div>
      )}

      {/* Form */}
      <motion.div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-10 rounded-3xl shadow-2xl bg-white border border-gray-200 space-y-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['age','height','weight'].map((field, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-3 p-4 rounded-xl shadow-inner bg-white"
              >
                {field === "age" && <FaUser className="text-black text-xl" />}
                {field === "height" && <FaRulerVertical className="text-black text-xl" />}
                {field === "weight" && <FaWeight className="text-black text-xl" />}
                <input
                  type="number"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field === "height" ? "Height (cm)" : field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full bg-transparent border-none focus:ring-0 font-medium text-black placeholder-gray-500"
                />
              </motion.div>
            ))}

            {[{
              name:"gender",options:["Male","Female"]
            },{
              name:"goal",options:["Weight Loss","Weight Gain","Stay Fit"]
            }, {
              name:"activity",options:["Beginner","Intermediate","Advanced"]
            }].map((sel, idx) => (
              <motion.select
                key={idx}
                whileHover={{ scale: 1.03 }}
                name={sel.name}
                value={formData[sel.name]}
                onChange={handleChange}
                className="w-full bg-white border p-4 rounded-xl shadow-inner font-medium text-black"
                required={sel.name !== "activity"}
              >
                <option value="">{sel.name.charAt(0).toUpperCase() + sel.name.slice(1)}</option>
                {sel.options.map((opt,i)=>(<option key={i} value={opt.toLowerCase().replace(" ","_")}>{opt}</option>))}
              </motion.select>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-lime-500 text-black font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg tracking-wide"
          >
            {loading ? "Generating..." : "Generate Workout Plan"}
          </motion.button>
        </motion.form>
      </motion.div>

      {/* Results Section */}
      {submitted && !loading && (
        <div className="max-w-7xl mx-auto space-y-20 mt-24">
          {/* Weekly Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${cardBg} p-10 rounded-3xl shadow-2xl`}
          >
            <h2 className="text-4xl font-bold mb-10 flex items-center gap-4">
              <FaRunning className="text-black" /> Weekly Plan
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6">
              {weeklyPlan.map((day, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center p-6 rounded-2xl shadow-lg"
                >
                  <div className="text-3xl mb-2">{day.icon}</div>
                  <p className="font-bold text-lg">{day.day}</p>
                  <p className="text-sm text-black">{day.task}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Suggested Exercises */}
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${cardBg} p-10 rounded-3xl shadow-2xl`}
            >
              <h2 className="text-4xl font-bold mb-12 flex items-center justify-center gap-4">
                <FaDumbbell className="text-black text-3xl" /> Suggested Exercises
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {suggestions.map((ex, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center text-center p-8 rounded-3xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all bg-white"
                  >
                    <div className="text-6xl mb-4">{ex.icon}</div>
                    <h3 className="text-2xl font-bold mb-3 text-black">{ex.name}</h3>
                    <p className="text-black">{ex.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
