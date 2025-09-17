"use client";

import { useState } from "react";
import { FaUtensils, FaLeaf, FaFish, FaDrumstickBite, FaSync } from "react-icons/fa";

export default function MyMeals() {
  const [meals, setMeals] = useState([
    {
      type: "Breakfast",
      icon: <FaLeaf className="text-green-700 text-3xl" />,
      description: "Oatmeal with almond butter, banana slices, and chia seeds.",
      calories: "350 kcal",
    },
    {
      type: "Lunch",
      icon: <FaFish className="text-green-700 text-3xl" />,
      description: "Grilled salmon with quinoa, steamed broccoli, and olive oil drizzle.",
      calories: "540 kcal",
    },
    {
      type: "Snack",
      icon: <FaUtensils className="text-green-700 text-3xl" />,
      description: "Greek yogurt with mixed berries and a sprinkle of granola.",
      calories: "220 kcal",
    },
    {
      type: "Dinner",
      icon: <FaDrumstickBite className="text-green-700 text-3xl" />,
      description: "Grilled chicken breast with roasted sweet potatoes and spinach salad.",
      calories: "620 kcal",
    },
  ]);

  // Simulate AI meal regeneration (placeholder)
  const regenerateMeals = () => {
    setMeals([
      {
        type: "Breakfast",
        icon: <FaLeaf className="text-green-700 text-3xl" />,
        description: "Avocado toast with poached eggs and cherry tomatoes.",
        calories: "400 kcal",
      },
      {
        type: "Lunch",
        icon: <FaFish className="text-green-700 text-3xl" />,
        description: "Brown rice bowl with grilled tuna, edamame, and sesame seeds.",
        calories: "560 kcal",
      },
      {
        type: "Snack",
        icon: <FaUtensils className="text-green-700 text-3xl" />,
        description: "Protein smoothie with whey, banana, and peanut butter.",
        calories: "300 kcal",
      },
      {
        type: "Dinner",
        icon: <FaDrumstickBite className="text-green-700 text-3xl" />,
        description: "Turkey meatballs with zucchini noodles and marinara sauce.",
        calories: "590 kcal",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#e1f0e5] py-16 px-6">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🍽 My Meals</h1>
        <p className="text-gray-600">
          Personalized AI-based meal suggestions designed to match your fitness goals.
        </p>
      </div>

      {/* Meal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {meals.map((meal, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-3">
              {meal.icon}
              <h2 className="text-2xl font-semibold text-gray-800">{meal.type}</h2>
            </div>
            <p className="text-gray-700 mb-2">{meal.description}</p>
            <span className="text-sm text-gray-500">{meal.calories}</span>
          </div>
        ))}
      </div>

      {/* Regenerate Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={regenerateMeals}
          className="flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-green-800 transition-transform transform hover:scale-105"
        >
          <FaSync /> Regenerate Meals (AI)
        </button>
      </div>
    </div>
  );
}
