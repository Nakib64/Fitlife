"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import cycleLottie from '../../../public/Lottie/Cycling.json';
import {
  FaUser, FaRulerVertical, FaWeight, FaBullseye,
  FaRunning, FaDumbbell, FaFireAlt, FaHeartbeat, FaBicycle,
  FaTrophy, FaSmile, FaAppleAlt, FaWater, FaBed, FaHeart,
  FaMars,
  FaFlag,
  FaVenus
} from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

export default function Myworkout() {
  const [formData, setFormData] = useState({ age: "", height: "", weight: "", gender: "", goal: "", activity: "" });
  const [suggestions, setSuggestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    let exercises = [];
    if (formData.goal === "weight_loss") {
      exercises = [
        { name: "Running", desc: "Boost stamina & burn calories", icon: <FaRunning className="text-red-500 text-4xl" /> },
        { name: "Jump Rope", desc: "Great cardio & fat burning", icon: <FaFireAlt className="text-orange-500 text-4xl" /> },
        { name: "HIIT", desc: "High intensity intervals", icon: <FaHeartbeat className="text-pink-500 text-4xl" /> },
      ];
    } else if (formData.goal === "weight_gain") {
      exercises = [
        { name: "Bench Press", desc: "Chest, shoulders & triceps", icon: <FaDumbbell className="text-blue-500 text-4xl" /> },
        { name: "Deadlift", desc: "Back, legs & grip strength", icon: <FaRunning className="text-green-500 text-4xl" /> },
        { name: "Squats", desc: "Legs & core power", icon: <FaFireAlt className="text-yellow-500 text-4xl" /> },
      ];
    } else {
      exercises = [
        { name: "Cycling", desc: "Cardio endurance & legs", icon: <FaBicycle className="text-purple-500 text-4xl" /> },
        { name: "Push-ups", desc: "Upper body & core strength", icon: <FaDumbbell className="text-teal-500 text-4xl" /> },
        { name: "Plank", desc: "Core stability & abs", icon: <FaBullseye className="text-indigo-500 text-4xl" /> },
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

  const bmi = formData.height && formData.weight ? (formData.weight / ((formData.height / 100) ** 2)).toFixed(1) : 0;

  return (
    <div className="bg-gradient-to-r from-green-100 via-green-50 to-green-100 min-h-screen py-12 px-5 font-sans">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-extrabold text-center mb-16 text-gray-800 tracking-tight"
      >
        Build Your Ultimate Workout
      </motion.h1>

      {/* Form + Lottie Side-by-Side */}
      <motion.div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      
<motion.form
  onSubmit={handleSubmit}
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  className="p-10 bg-white rounded-3xl shadow-2xl space-y-6"
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Age, Height, Weight */}
    {["age","height","weight"].map((field, idx) => (
      <motion.div key={idx} whileHover={{ scale: 1.03 }} className="flex items-center gap-3 bg-green-50 p-4 rounded-xl shadow-inner">
        {field === "age" && <FaUser className="text-green-500 text-xl"/>}
        {field === "height" && <FaRulerVertical className="text-green-500 text-xl"/>}
        {field === "weight" && <FaWeight className="text-green-500 text-xl"/>}
        <input
          type="number"
          name={field}
          value={formData[field]}
          onChange={handleChange}
          placeholder={
            field === "height" 
              ? "Height (cm)" 
              : field === "weight"
              ? "Weight (kg)"
              : field.charAt(0).toUpperCase() + field.slice(1)
          }
          className="w-full border-none focus:ring-0 bg-green-50 font-medium text-gray-700"
        />
      </motion.div>
    ))}

    {/* Gender */}
    <motion.div whileHover={{ scale:1.03 }} className={`flex items-center gap-3 p-4 rounded-xl shadow-inner ${formData.gender ? "bg-green-100" : "bg-green-50"}`}>
      {formData.gender === "male" ? <FaMars className="text-green-600 text-xl"/> : formData.gender === "female" ? <FaVenus className="text-pink-500 text-xl"/> : <FaUser className="text-gray-400 text-xl"/>}
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full border-none bg-transparent font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">Gender</option>
        <option value="male" className="hover:bg-green-200">Male</option>
        <option value="female" className="hover:bg-green-200">Female</option>
      </select>
    </motion.div>

    {/* Goal */}
    <motion.div whileHover={{ scale:1.03 }} className={`flex items-center gap-3 p-4 rounded-xl shadow-inner ${formData.goal ? "bg-green-100" : "bg-green-50"}`}>
      <FaFlag className="text-green-500 text-xl"/>
      <select
        name="goal"
        value={formData.goal}
        onChange={handleChange}
        className="w-full border-none bg-transparent font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">Goal</option>
        <option value="weight_loss" className="hover:bg-green-200">Weight Loss</option>
        <option value="weight_gain" className="hover:bg-green-200">Weight Gain</option>
        <option value="fitness" className="hover:bg-green-200">Stay Fit</option>
      </select>
    </motion.div>

    {/* Activity */}
    <motion.div whileHover={{ scale:1.03 }} className={`flex items-center gap-3 p-4 rounded-xl shadow-inner ${formData.activity ? "bg-green-100" : "bg-green-50"}`}>
      <FaRunning className="text-green-500 text-xl"/>
      <select
        name="activity"
        value={formData.activity}
        onChange={handleChange}
        className="w-full border-none bg-transparent font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">Activity Level</option>
        <option value="beginner" className="hover:bg-green-200">Beginner</option>
        <option value="intermediate" className="hover:bg-green-200">Intermediate</option>
        <option value="advanced" className="hover:bg-green-200">Advanced</option>
      </select>
    </motion.div>

  </div>

  {/* Submit */}
  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="w-full bg-green-500 text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-green-600 transition-all text-lg tracking-wide">
    Generate Workout Plan
  </motion.button>
</motion.form>



        {/* Lottie Animation */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
          <Lottie animationData={cycleLottie} loop={true} />
        </motion.div>
      </motion.div>

      {/* Submitted Sections */}
      {submitted && (
        <div className="max-w-6xl mx-auto space-y-16 mt-16">

          {/* Weekly Plan */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{opacity:1, y:0}} className="p-8 bg-white rounded-3xl shadow-xl">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><FaRunning className="text-green-500"/> Weekly Plan</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6">
              {weeklyPlan.map((day, idx) => (
                <motion.div key={idx} whileHover={{ scale:1.05 }} className="flex flex-col items-center p-4 bg-green-50 rounded-2xl shadow-md transition-transform">
                  <div className="text-3xl mb-2">{day.icon}</div>
                  <p className="font-semibold">{day.day}</p>
                  <p className="text-sm text-gray-600">{day.task}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Suggested Exercises */}
          {suggestions.length > 0 && (
            <motion.div initial={{ opacity:0, y:20 }} animate={{opacity:1, y:0}} className="p-8 bg-white rounded-3xl shadow-xl">
              <h2 className="text-4xl font-bold mb-8 flex items-center justify-center gap-3"><FaDumbbell className="text-green-500 text-3xl"/> Suggested Exercises</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {suggestions.map((ex, idx) => (
                  <motion.div key={idx} whileHover={{ scale:1.05 }} className="flex flex-col items-center text-center p-6 bg-green-50 rounded-3xl shadow-lg border border-green-100 transition-transform">
                    <div className="text-5xl mb-4">{ex.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{ex.name}</h3>
                    <p className="text-gray-700">{ex.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Health Metrics */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{opacity:1, y:0}} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ scale:1.05 }} className="bg-white p-6 rounded-3xl shadow-xl flex flex-col items-center">
              <FaHeart className="text-red-500 text-3xl mb-2"/>
              <p className="font-bold text-xl mb-1">BMI</p>
              <p className="text-gray-700 text-lg">{bmi}</p>
            </motion.div>
            <motion.div whileHover={{ scale:1.05 }} className="bg-white p-6 rounded-3xl shadow-xl flex flex-col items-center">
              <FaFireAlt className="text-orange-500 text-3xl mb-2"/>
              <p className="font-bold text-xl mb-1">Daily Cal Burn</p>
              <p className="text-gray-700 text-lg">{formData.activity === "advanced" ? 800 : formData.activity === "intermediate" ? 500 : 300} kcal</p>
            </motion.div>
            <motion.div whileHover={{ scale:1.05 }} className="bg-white p-6 rounded-3xl shadow-xl flex flex-col items-center">
              <FaTrophy className="text-yellow-400 text-3xl mb-2"/>
              <p className="font-bold text-xl mb-3">Progress</p>
              <div className="w-28 h-28">
                <CircularProgressbar
                  value={25}
                  text={`25%`}
                  styles={buildStyles({
                    pathColor: '#10B981',
                    textColor: '#374151',
                    trailColor: '#D1FAE5',
                    textSize: '18px'
                  })}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Fitness Tips */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{opacity:1, y:0}} className="p-8 bg-white rounded-3xl shadow-xl">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><FaSmile className="text-green-500"/> Fitness Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon:<FaWater className="text-blue-500 text-3xl"/>, text:"Stay hydrated & drink 2-3L water daily." },
                { icon:<FaAppleAlt className="text-red-500 text-3xl"/>, text:"Eat protein-rich meals post-workout." },
                { icon:<FaBed className="text-indigo-500 text-3xl"/>, text:"Get at least 7-8 hours of sleep." },
                { icon:<FaHeart className="text-pink-500 text-3xl"/>, text:"Always warm up & cool down." },
              ].map((tip, idx) => (
                <motion.div key={idx} whileHover={{ scale:1.05 }} className="flex items-center gap-4 p-5 bg-green-50 rounded-2xl shadow-md transition-transform">
                  {tip.icon}
                  <p className="text-gray-700 font-medium">{tip.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      )}
    </div>
  );
}
