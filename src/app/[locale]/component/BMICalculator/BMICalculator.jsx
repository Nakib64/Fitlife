"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (!weight || !feet || !inches || !age) return;

    const totalInches = parseInt(feet) * 12 + parseInt(inches);
    const heightInMeters = totalInches * 0.0254;

    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    let bmiCategory = "";

    if (age >= 18) {
      if (bmiValue < 18.5) bmiCategory = "Underweight";
      else if (bmiValue >= 18.5 && bmiValue <= 24.9) bmiCategory = "Normal weight";
      else if (bmiValue >= 25 && bmiValue <= 29.9) bmiCategory = "Overweight";
      else if (bmiValue >= 30 && bmiValue <= 34.9) bmiCategory = "Obese (Class I)";
      else if (bmiValue >= 35 && bmiValue <= 39.9) bmiCategory = "Obese (Class II)";
      else bmiCategory = "Obese (Class III / Severe)";
    } else {
      if (bmiValue < 5) bmiCategory = "Underweight";
      else if (bmiValue >= 5 && bmiValue < 85) bmiCategory = "Healthy";
      else if (bmiValue >= 85 && bmiValue < 95) bmiCategory = "Overweight";
      else bmiCategory = "Obese";
    }

    setBmi(bmiValue);
    setCategory(bmiCategory);
  };

  const categoriesAdult = [
    { name: "Underweight", range: "< 18.5" },
    { name: "Normal weight", range: "18.5 – 24.9" },
    { name: "Overweight", range: "25 – 29.9" },
    { name: "Obese (Class I)", range: "30 – 34.9" },
    { name: "Obese (Class II)", range: "35 – 39.9" },
    { name: "Obese (Class III / Severe)", range: "40+" },
  ];

  const categoriesChildren = [
    { name: "Underweight", range: "< 5th percentile" },
    { name: "Healthy", range: "5th–84th percentile" },
    { name: "Overweight", range: "85th–94th percentile" },
    { name: "Obese", range: "≥ 95th percentile" },
  ];

  return (
    <section className="py-10 bg-[#f3f4f7]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold tracking-wide 
  bg-gradient-to-r from-gray-800 via-slate-700 to-blue-600 
  text-transparent bg-clip-text animate-gradient"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Know Your BMI
        </motion.h2>
        <motion.p
          className="mt-4 mb-7 text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Calculate your Body Mass Index (BMI) and see your health category.
        </motion.p>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
          {/* Left side */}
          <div className="flex-1 flex">
            <motion.div
              className="w-full bg-white text-gray-900 rounded-2xl border border-gray-300 shadow-xl overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-green-600 text-white text-center py-4 text-xl font-bold border-b">
                BMI Calculator
              </div>
              <div className="p-6 space-y-4 flex-1">
                <div>
                  <label className="text-sm font-semibold mb-1 flex justify-start">
                    Weight (kg):
                  </label>
                  <input
                    type="number"
                    value={weight}
                    placeholder="Enter weight"
                    onChange={(e) => setWeight(e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-1 flex justify-start">
                    Height:
                  </label>
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-gray-600">Feet: </span>
                      <input
                        type="number"
                        value={feet}
                        onChange={(e) => setFeet(e.target.value)}
                        className="border rounded-lg px-4 py-2 w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-gray-600">Inches: </span>
                      <input
                        type="number"
                        value={inches}
                        onChange={(e) => setInches(e.target.value)}
                        className="border rounded-lg px-4 py-2 w-full"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-1 flex justify-start">
                    Age:
                  </label>
                  <input
                    type="number"
                    value={age}
                    placeholder="Enter age"
                    onChange={(e) => setAge(e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-1 flex justify-start">
                    Gender:
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="flex justify-start">
                  <button
                    onClick={calculateBMI}
                    className="mt-4 px-6 py-3 cursor-pointer bg-lime-400 text-zinc-900 font-bold rounded-xl shadow-md hover:bg-lime-500 transition-colors duration-300"
                  >
                    Calculate BMI
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right side */}
          <motion.div
            className="flex-1 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            
            <div className="w-full rounded-2xl border border-gray-200 shadow-md flex flex-col justify-center p-6">
             {/* Before Calculation */}
{!bmi && (
  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
    {/* Animated Illustration Style Circle */}
    <motion.div 
    initial={{ scale: 0 }} 
    animate={{ scale: [1, 1.2, 1] }} 
    transition={{ repeat: Infinity, duration: 2 }} 
    className="w-16 h-16 flex items-center justify-center rounded-full bg-lime-100 text-lime-600 text-3xl font-bold shadow" >
       📊 
    </motion.div>

    {/* Title */}
    <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-xl font-bold text-gray-800" > Your BMI Result Will Appear Here </motion.h3>

    {/* Animated progress placeholder */}
    <motion.div
      animate={{ width: ["40%", "60%", "40%"] }}
      transition={{ repeat: Infinity, duration: 4 }}
      className="h-1 rounded-full bg-gradient-to-r from-lime-400 to-green-500"
      style={{ width: "40%" }}
    ></motion.div>

    {/* Subtitle with soft highlight */}
   <motion.p 
   initial={{ opacity: 0 }} 
   animate={{ opacity: 1 }} 
   transition={{ delay: 0.8, duration: 0.8 }} 
   className="text-gray-600 text-sm md:text-base max-w-sm" > Enter your 
   <span className="font-semibold">weight</span>,{" "} 
   <span className="font-semibold">height</span>, and{" "} 
   <span className="font-semibold">age</span> in the form to calculate your Body Mass Index. 
   </motion.p>

  </div>
)}


              {/* After Calculation */}
              {bmi && (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <h3 className="font-bold text-xl mb-4 text-gray-800">BMI Result</h3>
                  <div className="relative flex flex-col items-center mb-6">
                    <svg className="w-44 h-44" viewBox="0 0 36 36">
                      <path
                        className="text-gray-200"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        strokeWidth="3"
                      />
                      <motion.path
                        className={`stroke-current ${
                          category.includes("Underweight")
                            ? "text-blue-500"
                            : category.includes("Normal") || category === "Healthy"
                            ? "text-green-500"
                            : category.includes("Overweight")
                            ? "text-yellow-400"
                            : "text-red-500"
                        }`}
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        strokeWidth="3"
                        strokeDasharray={`${(bmi / 40) * 100}, 100`}
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0, 100" }}
                        animate={{ strokeDasharray: `${(bmi / 40) * 100}, 100` }}
                        transition={{ duration: 1.5 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <p className="text-2xl font-bold">{bmi}</p>
                      <p className="text-sm font-medium text-gray-700">{category}</p>
                    </div>
                  </div>

                  <div className="w-full max-w-md mt-6 space-y-4">
                    <h2 className="font-bold text-xl ">
                      BMI Categories {age >= 18 ? "(Adult)" : "(Children)"}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(age >= 18 ? categoriesAdult : categoriesChildren).map((c, index) => (
                        <div
                          key={index}
                          className={`px-4 py-3 rounded-xl border shadow-sm transition-colors ${
                            category === c.name
                              ? "bg-lime-100 border-lime-500 font-bold text-lime-800"
                              : "bg-white hover:bg-gray-50 border-gray-200"
                          }`}
                        >
                          <p className="font-semibold text-gray-600 text-sm">{c.name}</p>
                          <p className="text-gray-600">{c.range}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
