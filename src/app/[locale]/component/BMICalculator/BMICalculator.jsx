"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
export default function BMICalculator() {
  const t = useTranslations("home.bmi");

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
      if (bmiValue < 18.5) bmiCategory = t("underweight");
      else if (bmiValue <= 24.9) bmiCategory = t("normal");
      else if (bmiValue <= 29.9) bmiCategory = t("overweight");
      else if (bmiValue <= 34.9) bmiCategory = t("obese1");
      else if (bmiValue <= 39.9) bmiCategory = t("obese2");
      else bmiCategory = t("obese3");
    } else {
      if (bmiValue < 5) bmiCategory = t("underweight");
      else if (bmiValue < 85) bmiCategory = t("healthy");
      else if (bmiValue < 95) bmiCategory = t("overweight");
      else bmiCategory = t("underweight");
    }

    setBmi(bmiValue);
    setCategory(bmiCategory);
  };

  const categoriesAdult = [
    { name: t("underweight"), range: t("rangeUnder") },
    { name: t("normal"), range: t("rangeNormal") },
    { name: t("overweight"), range: t("rangeOver") },
    { name: t("obese1"), range: t("rangeObese1") },
    { name: t("obese2"), range: t("rangeObese2") },
    { name: t("obese3"), range: t("rangeObese3") }
  ];

  const categoriesChildren = [
    { name: t("underweight"), range: t("percentileUnder") },
    { name: t("healthy"), range: t("percentileHealthy") },
    { name: t("overweight"), range: t("percentileOver") },
    { name: t("underweight"), range: t("percentileObese") }
  ];

  return (
    <section className="py-10 bg-[#f3f4f7]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold tracking-wide 
          bg-gradient-to-r from-gray-800 via-slate-700 to-blue-600 
          text-transparent bg-clip-text animate-gradient"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t("title")}
        </motion.h2>
        <motion.p
          className="mt-4 mb-7 text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t("subtitle")}
        </motion.p>

        {/* Calculator Section */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
          {/* Left */}
          <div className="flex-1 flex">
            <motion.div
              className="w-full bg-white rounded-2xl border border-gray-300 shadow-xl flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-green-600 text-white text-center py-4 text-xl font-bold border-b">
                {t("calculatorTitle")}
              </div>
              <div className="p-6 space-y-4 flex-1">
                <div>
                  <label className="text-sm font-semibold mb-1 flex justify-start">
                    {t("weight")}
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-1 flex justify-start">
                    {t("height")}
                  </label>
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex items-center gap-2 flex-1">
                      <span>{t("feet")}: </span>
                      <input
                        type="number"
                        value={feet}
                        onChange={(e) => setFeet(e.target.value)}
                        className="border rounded-lg px-4 py-2 w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <span>{t("inches")}: </span>
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
                    {t("age")}
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-1 flex justify-start">
                    {t("gender")}
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full"
                  >
                    <option value="male">{t("male")}</option>
                    <option value="female">{t("female")}</option>
                  </select>
                </div>

                <button
                  onClick={calculateBMI}
                  className="mt-4 px-6 py-3 bg-lime-400 font-bold rounded-xl hover:bg-lime-500 transition"
                >
                  {t("calculateBtn")}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div className="flex-1 flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="w-full rounded-2xl border shadow-md flex flex-col justify-center p-6">
              {!bmi && (
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-16 h-16 flex items-center justify-center rounded-full bg-lime-100 text-lime-600 text-3xl font-bold shadow"
                  >
                    📊
                  </motion.div>
                  <motion.h3 className="text-xl font-bold">{t("beforeTitle")}</motion.h3>
                  <motion.p className="text-gray-600 text-sm md:text-base max-w-sm">
                    {t("beforeDesc")}
                  </motion.p>
                </div>
              )}

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
                            category.includes(t("underweight"))
                              ? "text-blue-500"
                              : category.includes(t("normal")) || category === t("healthy")
                              ? "text-green-500"
                              : category.includes(t("overweight"))
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
