"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import cycleLottie from "../../../public/Lottie/Cycling.json";
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
  FaWater,
  FaBed,
  FaHeart,
} from "react-icons/fa";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    let exercises = [];
    if (formData.goal === "weight_loss") {
      exercises = [
        {
          name: "Running",
          desc: "Boost stamina & burn calories",
          icon: <FaRunning className="text-red-500 text-4xl" />,
        },
        {
          name: "Jump Rope",
          desc: "Great cardio & fat burning",
          icon: <FaFireAlt className="text-orange-500 text-4xl" />,
        },
        {
          name: "HIIT",
          desc: "High intensity intervals",
          icon: <FaHeartbeat className="text-pink-500 text-4xl" />,
        },
      ];
    } else if (formData.goal === "weight_gain") {
      exercises = [
        {
          name: "Bench Press",
          desc: "Chest, shoulders & triceps",
          icon: <FaDumbbell className="text-blue-500 text-4xl" />,
        },
        {
          name: "Deadlift",
          desc: "Back, legs & grip strength",
          icon: <FaRunning className="text-green-500 text-4xl" />,
        },
        {
          name: "Squats",
          desc: "Legs & core power",
          icon: <FaFireAlt className="text-yellow-500 text-4xl" />,
        },
      ];
    } else {
      exercises = [
        {
          name: "Cycling",
          desc: "Cardio endurance & legs",
          icon: <FaBicycle className="text-purple-500 text-4xl" />,
        },
        {
          name: "Push-ups",
          desc: "Upper body & core strength",
          icon: <FaDumbbell className="text-teal-500 text-4xl" />,
        },
        {
          name: "Plank",
          desc: "Core stability & abs",
          icon: <FaBullseye className="text-indigo-500 text-4xl" />,
        },
      ];
    }

    setSuggestions(exercises);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-black py-12 px-5 font-sans">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-20"
      >
        <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-6">
          Build Your Ultimate Workout
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Personalize your fitness plan with AI-powered recommendations. Enter your details, pick your goal, and let’s transform your journey.
        </p>
      </motion.div>

      {/* Form & Lottie */}
      <motion.div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-10 rounded-3xl shadow-2xl bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-gray-200/40 dark:border-gray-700/40 space-y-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['age','height','weight'].map((field, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-3 p-4 rounded-xl shadow-inner bg-white/70 dark:bg-gray-800/40 backdrop-blur-lg"
              >
                {field === "age" && <FaUser className="text-green-500 text-xl" />}
                {field === "height" && <FaRulerVertical className="text-green-500 text-xl" />}
                {field === "weight" && <FaWeight className="text-green-500 text-xl" />}
                <input
                  type="number"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full bg-transparent border-none focus:ring-0 font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400"
                />
              </motion.div>
            ))}

            {[{
              name:"gender",options:["Male","Female"]
            },{
              name:"goal",options:["Weight Loss","Weight Gain","Stay Fit"]
            },{
              name:"activity",options:["Beginner","Intermediate","Advanced"]
            }].map((sel, idx) => (
              <motion.select
                key={idx}
                whileHover={{ scale: 1.03 }}
                name={sel.name}
                value={formData[sel.name]}
                onChange={handleChange}
                className="w-full bg-white/70 dark:bg-gray-800/40 backdrop-blur-lg border-none p-4 rounded-xl shadow-inner font-medium text-gray-700 dark:text-gray-200"
                required={sel.name !== "activity"}
              >
                <option value="">{sel.name.charAt(0).toUpperCase() + sel.name.slice(1)}</option>
                {sel.options.map((opt,i)=>(
                  <option key={i} value={opt.toLowerCase().replace(" ","_")}>{opt}</option>
                ))}
              </motion.select>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg tracking-wide"
          >
            Generate Workout Plan
          </motion.button>
        </motion.form>

        {/* Lottie */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full flex justify-center"
        >
          <Lottie animationData={cycleLottie} loop={true} className="w-96 h-96" />
        </motion.div>
      </motion.div>

      {/* Results Section */}
      {submitted && (
        <div className="max-w-7xl mx-auto space-y-20 mt-24">
          {/* Weekly Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-10 bg-white/70 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-10 flex items-center gap-4">
              <FaRunning className="text-green-500" /> Weekly Plan
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6">
              {weeklyPlan.map((day, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center p-6 bg-white/90 dark:bg-gray-800/60 rounded-2xl shadow-lg"
                >
                  <div className="text-3xl mb-2">{day.icon}</div>
                  <p className="font-bold text-lg">{day.day}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{day.task}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Suggested Exercises */}
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-10 bg-white/70 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl shadow-2xl"
            >
              <h2 className="text-4xl font-bold mb-12 flex items-center justify-center gap-4">
                <FaDumbbell className="text-green-500 text-3xl" /> Suggested Exercises
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {suggestions.map((ex, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center text-center p-8 bg-white/90 dark:bg-gray-800/60 rounded-3xl shadow-lg border border-green-100 dark:border-gray-700"
                  >
                    <div className="text-6xl mb-4">{ex.icon}</div>
                    <h3 className="text-2xl font-bold mb-3">{ex.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{ex.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Health Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-xl p-8 rounded-3xl shadow-xl flex flex-col items-center"
            >
              <FaHeart className="text-red-500 text-4xl mb-2" />
              <p className="font-bold text-2xl mb-2">BMI</p>
              <p className="text-gray-700 dark:text-gray-300 text-lg">{bmi}</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-xl p-8 rounded-3xl shadow-xl flex flex-col items-center"
            >
              <FaFireAlt className="text-orange-500 text-4xl mb-2" />
              <p className="font-bold text-2xl mb-2">Daily Cal Burn</p>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                {formData.activity === "advanced"
                  ? 800
                  : formData.activity === "intermediate"
                  ? 500
                  : 300} kcal
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-xl p-8 rounded-3xl shadow-xl flex flex-col items-center"
            >
              <FaTrophy className="text-yellow-400 text-4xl mb-3" />
              <p className="font-bold text-2xl mb-3">Progress</p>
              <div className="w-28 h-28">
                <CircularProgressbar
                  value={25}
                  text={`25%`}
                  styles={buildStyles({
                    pathColor: "#10B981",
                    textColor: "#374151",
                    trailColor: "#D1FAE5",
                    textSize: "18px",
                  })}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Fitness Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-10 bg-white/70 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
              <FaSmile className="text-green-500" /> Fitness Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[{
                icon:<FaWater className="text-blue-500 text-3xl" />, text:"Stay hydrated & drink 2-3L water daily."
              },{
                icon:<FaAppleAlt className="text-red-500 text-3xl" />, text:"Eat protein-rich meals post-workout."
              },{
                icon:<FaBed className="text-indigo-500 text-3xl" />, text:"Get at least 7-8 hours of sleep."
              },{
                icon:<FaHeart className="text-pink-500 text-3xl" />, text:"Always warm up & cool down."
              }].map((tip, idx)=>(
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-5 p-6 bg-white/90 dark:bg-gray-800/60 rounded-2xl shadow-md"
                >
                  {tip.icon}
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{tip.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
