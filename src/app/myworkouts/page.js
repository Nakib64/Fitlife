"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import cycleLottie from "../../../public/Lottie/Cycling.json";
import overWeight from "../../../public/Lottie/Weight scale.json";
import underWeight from "../../../public/Lottie/underweight.json";
import perfectShape from "../../../public/Lottie/perfectshape.json";
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
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Divide } from "lucide-react";

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
  const [loading, setLoading] = useState(false); // loading state

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
    }, 1000); // 1s delay
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

  // BMI feedback
  let bmiFeedback = null;
  if (bmi > 0) {
    if (bmi < 18.5) {
      bmiFeedback = { text: "You are underweight. Gain weight with proper diet and exercise.", lottie: underWeight };
    } else if (bmi >= 18.5 && bmi <= 25) {
      bmiFeedback = { text: "You have a perfect body shape! Keep it up.", lottie: perfectShape };
    } else {
      bmiFeedback = { text: "You are overweight. Focus on losing weight with exercise & diet.", lottie: overWeight };
    }
  }

  return (
//     <div className="min-h-screen py-12 px-5 font-sans">
//       {/* Hero Section */}
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-center max-w-3xl mx-auto mb-6"
//       >
//         <h1 className="text-6xl font-extrabold tracking-tight text-black mb-6">
//           Build Your Ultimate Workout
//         </h1>
//         <p className="text-lg text-black leading-relaxed">
//           Personalize your fitness plan with AI-powered recommendations. Enter your details, pick your goal, and let’s transform your journey.
//         </p>
//       </motion.div>

//       {/* Motivational Quote */}
//       <motion.div className="my-8 text-center">
//         <p className="text-xl font-semibold text-black italic">
//           The only bad workout is the one you didn’t do.
//         </p>
//       </motion.div>

//       {/* Info Cards (above form, smaller) */}
//       {!submitted && !loading && (
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className={`${cardBg} p-4 rounded-xl shadow-lg text-center`}>
//             <FaFireAlt className="text-orange-500 text-2xl mx-auto mb-2" />
//             <h3 className="font-bold text-lg mb-1 text-black">Burn Calories</h3>
//           </div>
//           <div className={`${cardBg} p-4 rounded-xl shadow-lg text-center`}>
//             <FaDumbbell className="text-blue-500 text-2xl mx-auto mb-2" />
//             <h3 className="font-bold text-lg mb-1 text-black">Build Strength</h3>
//           </div>
//           <div className={`${cardBg} p-4 rounded-xl shadow-lg text-center`}>
//             <FaHeartbeat className="text-pink-500 text-2xl mx-auto mb-2" />
//             <h3 className="font-bold text-lg mb-1 text-black">Improve Health</h3>
//           </div>
//         </div>
//       )}

//       {/* Form & Lottie */}
//       <motion.div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
//         {/* Form */}
//         <motion.form
//           onSubmit={handleSubmit}
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="p-10 rounded-3xl shadow-2xl bg-white border border-gray-200 space-y-10"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {['age','height','weight'].map((field, idx) => (
//               <motion.div
//                 key={idx}
//                 whileHover={{ scale: 1.03 }}
//                 className="flex items-center gap-3 p-4 rounded-xl shadow-inner bg-white"
//               >
//                 {field === "age" && <FaUser className="text-black text-xl" />}
//                 {field === "height" && <FaRulerVertical className="text-black text-xl" />}
//                 {field === "weight" && <FaWeight className="text-black text-xl" />}
//                 <input
//                   type="number"
//                   name={field}
//                   value={formData[field]}
//                   onChange={handleChange}
//                   placeholder={field === "height" ? "Height (cm)" : field.charAt(0).toUpperCase() + field.slice(1)}
//                   className="w-full bg-transparent border-none focus:ring-0 font-medium text-black placeholder-gray-500"
//                 />
//               </motion.div>
//             ))}

//             {[{
//               name:"gender",options:["Male","Female"]
//             },{
//               name:"goal",options:["Weight Loss","Weight Gain","Stay Fit"]
//             },{
//               name:"activity",options:["Beginner","Intermediate","Advanced"]
//             }].map((sel, idx) => (
//               <motion.select
//                 key={idx}
//                 whileHover={{ scale: 1.03 }}
//                 name={sel.name}
//                 value={formData[sel.name]}
//                 onChange={handleChange}
//                 className="w-full bg-white border p-4 rounded-xl shadow-inner font-medium text-black"
//                 required={sel.name !== "activity"}
//               >
//                 <option value="">{sel.name.charAt(0).toUpperCase() + sel.name.slice(1)}</option>
//                 {sel.options.map((opt,i)=>(<option key={i} value={opt.toLowerCase().replace(" ","_")}>{opt}</option>))}
//               </motion.select>
//             ))}
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             className="w-full bg-lime-500 text-black font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg tracking-wide"
//           >
//             {loading ? "Generating..." : "Generate Workout Plan"}
//           </motion.button>
//         </motion.form>

//         {/* Lottie */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="w-full flex justify-center"
//         >
//           <Lottie animationData={cycleLottie} loop={true} className="w-96 h-96" />
//         </motion.div>
//       </motion.div>

//       {/* Dummy Health Metrics (Pre-submit, smaller cards) */}
//       {!submitted && !loading && (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
//           <div className={`${cardBg} p-4 rounded-xl shadow-xl flex flex-col items-center`}>
//             <FaHeart className="text-red-500 text-3xl mb-1" />
//             <p className="font-bold text-lg mb-1 text-black">BMI</p>
//             <p className="text-black text-sm">--</p>
//           </div>
//           <div className={`${cardBg} p-4 rounded-xl shadow-xl flex flex-col items-center`}>
//             <FaFireAlt className="text-orange-500 text-3xl mb-1" />
//             <p className="font-bold text-lg mb-1 text-black">Daily Cal Burn</p>
//             <p className="text-black text-sm">-- kcal</p>
//           </div>
//           <div className={`${cardBg} p-4 rounded-xl shadow-xl flex flex-col items-center`}>
//             <FaTrophy className="text-yellow-400 text-3xl mb-1" />
//             <p className="font-bold text-lg mb-1 text-black">Progress</p>
//             <div className="w-20 h-20">
//               <CircularProgressbar
//                 value={0}
//                 text={`0%`}
//                 styles={buildStyles({
//                   pathColor: "#D1D5DB",
//                   textColor: "#374151",
//                   trailColor: "#E5E7EB",
//                   textSize: "14px",
//                 })}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Premium BMI Feedback Section with Glassmorphism */}
// {bmiFeedback && !loading && (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     className="w-full mt-12 p-12 rounded-3xl shadow-2xl bg-white/70 backdrop-blur-md flex flex-col md:flex-row items-center gap-8 border border-gray-200"
//   >
//     {/* Lottie Animation - 2/3 width */}
//     <div className="md:w-2/3 flex justify-center items-center">
//       <Lottie 
//         animationData={bmiFeedback.lottie} 
//         loop={true} 
//         className="w-full h-96 md:h-[28rem]" 
//       />
//     </div>

//     {/* BMI Metric & Feedback - 1/3 width */}
//     <div className="md:w-1/3 flex flex-col items-center gap-6">
//       {/* Feedback Text */}
//       <p className="text-2xl font-extrabold text-center text-gray-800">
//         {bmiFeedback.text}
//       </p>

//       {/* Glass BMI Card */}
//       <div className="w-full bg-gradient-to-br from-white/80 to-white/30 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300">
//         <div className="relative w-24 h-24 mb-4">
//           <FaHeart className={`absolute inset-0 w-full h-full text-6xl ${bmi < 18.5 ? 'text-yellow-400' : bmi <= 25 ? 'text-green-500' : 'text-red-500'} animate-pulse`} />
//         </div>
//         <p className="text-xl font-semibold text-gray-700 mb-2">Your BMI</p>
//         <p className={`text-4xl font-bold ${bmi < 18.5 ? 'text-yellow-500' : bmi <= 25 ? 'text-green-600' : 'text-red-600'}`}>
//           {bmi}
//         </p>

//         {/* BMI Category Label */}
//         <p className={`mt-2 text-lg font-medium ${bmi < 18.5 ? 'text-yellow-600' : bmi <= 25 ? 'text-green-700' : 'text-red-700'}`}>
//           {bmi < 18.5 ? 'Underweight' : bmi <= 25 ? 'Normal' : 'Overweight'}
//         </p>
//       </div>

//       {/* Extra Motivational Note */}
//       <p className="text-center text-gray-600 mt-4">
//         Follow the suggested exercises and tips below to reach your ideal BMI.
//       </p>
//     </div>
//   </motion.div>
// )}


//       {/* Results Section (after submit) */}
//       {submitted && !loading && (
//         <div className="max-w-7xl mx-auto space-y-20 mt-24">
//           {/* Weekly Plan */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className={`${cardBg} p-10 rounded-3xl shadow-2xl`}
//           >
//             <h2 className="text-4xl font-bold mb-10 flex items-center gap-4">
//               <FaRunning className="text-black" /> Weekly Plan
//             </h2>
//             <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6">
//               {weeklyPlan.map((day, idx) => (
//                 <motion.div
//                   key={idx}
//                   whileHover={{ scale: 1.05 }}
//                   className="flex flex-col items-center p-6 rounded-2xl shadow-lg"
//                 >
//                   <div className="text-3xl mb-2">{day.icon}</div>
//                   <p className="font-bold text-lg">{day.day}</p>
//                   <p className="text-sm text-black">{day.task}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Suggested Exercises - Premium Cards */}
//           {suggestions.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className={`${cardBg} p-10 rounded-3xl shadow-2xl`}
//             >
//               <h2 className="text-4xl font-bold mb-12 flex items-center justify-center gap-4">
//                 <FaDumbbell className="text-black text-3xl" /> Suggested Exercises
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//                 {suggestions.map((ex, idx) => (
//                   <motion.div
//                     key={idx}
//                     whileHover={{ scale: 1.05 }}
//                     className="flex flex-col items-center text-center p-8 rounded-3xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all bg-white"
//                   >
//                     <div className="text-6xl mb-4">{ex.icon}</div>
//                     <h3 className="text-2xl font-bold mb-3 text-black">{ex.name}</h3>
//                     <p className="text-black">{ex.desc}</p>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           )}

//           {/* Health Metrics */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="grid grid-cols-1 md:grid-cols-3 gap-10"
//           >
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className={`${cardBg} p-8 rounded-3xl shadow-xl flex flex-col items-center`}
//             >
//               <FaHeart className="text-red-500 text-4xl mb-2" />
//               <p className="font-bold text-2xl mb-2 text-black">BMI</p>
//               <p className="text-black text-lg">{bmi}</p>
//             </motion.div>

//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className={`${cardBg} p-8 rounded-3xl shadow-xl flex flex-col items-center`}
//             >
//               <FaFireAlt className="text-orange-500 text-4xl mb-2" />
//               <p className="font-bold text-2xl mb-2 text-black">Daily Cal Burn</p>
//               <p className="text-black text-lg">
//                 {formData.activity === "advanced"
//                   ? 800
//                   : formData.activity === "intermediate"
//                   ? 500
//                   : 300} kcal
//               </p>
//             </motion.div>

//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className={`${cardBg} p-8 rounded-3xl shadow-xl flex flex-col items-center`}
//             >
//               <FaTrophy className="text-yellow-400 text-4xl mb-3" />
//               <p className="font-bold text-2xl mb-3 text-black">Progress</p>
//               <div className="w-28 h-28">
//                 <CircularProgressbar
//                   value={25}
//                   text={`25%`}
//                   styles={buildStyles({
//                     pathColor: "#10B981",
//                     textColor: "#374151",
//                     trailColor: "#D1FAE5",
//                     textSize: "18px",
//                   })}
//                 />
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Fitness Tips Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className={`${cardBg} p-10 rounded-3xl shadow-2xl`}
//           >
//             <h2 className="text-4xl font-bold mb-10 flex items-center gap-4">
//               <FaAppleAlt className="text-green-500" /> Fitness Tips
//             </h2>
//             <ul className="list-disc ml-5 space-y-3 text-black">
//               <li>Stay hydrated and drink at least 2-3 liters of water daily.</li>
//               <li>Maintain a balanced diet with proteins, carbs, and healthy fats.</li>
//               <li>Sleep 7-8 hours every night to recover and grow muscles.</li>
//               <li>Track your progress weekly to stay motivated.</li>
//               <li>Warm-up before exercises and cool down afterward to prevent injury.</li>
//             </ul>
//           </motion.div>
//         </div>
//       )}
//     </div>
<div>
  my workout
</div>  );
}
