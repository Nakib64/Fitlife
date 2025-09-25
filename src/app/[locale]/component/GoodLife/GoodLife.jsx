"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const tips = [
  {
    id: 1,
    category: "Food",
    title: "Eat More Greens",
    desc: "Fill your plate with fresh green vegetables for energy.",
    details: `
      ✅ Boosts immunity, improves digestion
      ✅ Rich in vitamins A, C, K and fiber
      ✅ Spinach, broccoli, kale, peas, beans
      💡 Add greens in smoothies, soups or omelets
    `,
    img: "/images/image-1.png",
  },
  {
    id: 2,
    category: "Food",
    title: "Healthy Breakfast",
    desc: "Start your day with a colorful, nutrient-packed bowl.",
    details: `
      ✅ Improves focus and metabolism
      ✅ Best choices: oats, fruits, eggs, yogurt
      💡 Avoid sugary cereals, prefer whole grains
    `,
    img: "/images/image-2.png",
  },
  {
    id: 3,
    category: "Food",
    title: "Stay Hydrated",
    desc: "Drink enough water daily for focus and wellness.",
    details: `
      ✅ Supports brain and body functions
      ✅ Minimum 8 glasses per day
      💡 Add lemon or cucumber for natural flavor
    `,
    img: "/images/image-3.png",
  },
  {
    id: 4,
    category: "Exercise",
    title: "Morning Jog",
    desc: "Jogging in fresh air keeps your heart strong.",
    details: `
      ✅ Boosts stamina and energy
      ✅ Improves heart and lung health
      💡 20–30 min jog is enough
    `,
    img: "/images/image-4.png",
  },
  {
    id: 5,
    category: "Exercise",
    title: "Yoga & Mindfulness",
    desc: "Practice yoga to reduce stress and stay flexible.",
    details: `
      ✅ Reduces stress & anxiety
      ✅ Increases flexibility & balance
      💡 Just 10 mins daily can improve mood
    `,
    img: "/images/image-5.png",
  },
  {
    id: 6,
    category: "Exercise",
    title: "Strength Training",
    desc: "Build stamina and muscle with training.",
    details: `
      ✅ Increases strength & metabolism
      ✅ Improves posture & bone density
      💡 Use bodyweight, resistance bands, or weights
    `,
    img: "/images/image-6.png",
  },
  {
    id: 7,
    category: "Activity",
    title: "Desk Stretching",
    desc: "Stretch at work for better posture.",
    details: `
      ✅ Relieves stiffness & improves circulation
      ✅ Prevents back/neck pain
      💡 Stretch 5 min every hour
    `,
    img: "/images/image-7.png",
  },
  {
    id: 8,
    category: "Activity",
    title: "Cycling Outdoors",
    desc: "Cycling keeps you active and happy.",
    details: `
      ✅ Burns calories & tones muscles
      ✅ Improves cardiovascular health
      💡 Great for commuting & reducing stress
    `,
    img: "/images/image-8.png",
  },
  {
    id: 9,
    category: "Activity",
    title: "Evening Walk",
    desc: "Relax your body and mind with walking.",
    details: `
      ✅ Supports digestion after meals
      ✅ Reduces stress and clears the mind
      💡 Walk 20–30 min at an easy pace
    `,
    img: "/images/image-9.png",
  },
];

export default function GoodLife() {
  const categories = ["Food", "Exercise", "Activity"];
  const [activeCategory, setActiveCategory] = useState("Food");
  const [manualCategory, setManualCategory] = useState(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(null);

  // auto button highlight
  useEffect(() => {
    if (manualCategory) return;

    let index = 0;
    const interval = setInterval(() => {
      setActiveCategory(categories[index % categories.length]);
      index++;
    }, 6000);

    return () => clearInterval(interval);
  }, [manualCategory]);

  const visibleTips = manualCategory
    ? tips.filter((t) => t.category === manualCategory)
    : [...tips, ...tips, ...tips, ...tips]; // ✅ repeat 4× for smooth infinite scroll

  return (
    <section
      className="bg-[#f3f4f7] py-16"
      onMouseLeave={() => {
        setManualCategory(null);
        setHovered(null);
        setPaused(false);
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-7">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide 
  bg-gradient-to-r from-gray-800 via-slate-700 to-blue-600 
  text-transparent bg-clip-text animate-gradient">Good Life Tips</h2>
          <p className="mt-4 mb-7 text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Simple daily habits for a healthier lifestyle.
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setManualCategory(cat);
                setActiveCategory(cat);
                setHovered(null);
              }}
              className={clsx(
                "px-6 py-2 rounded-full font-semibold transition",
                activeCategory === cat
                  ? "bg-[#cbff5b] text-black"
                  : "bg-black text-white hover:bg-gray-800"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="overflow-hidden w-full relative">
          {manualCategory ? (
            // Static mode
            <div className="flex justify-center gap-8 flex-wrap">
              {visibleTips.map((tip) => (
                <div
                  key={tip.id}
                  onMouseEnter={() => setHovered(tip.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="flex-none w-[320px] h-[420px] rounded-2xl shadow-xl bg-white overflow-hidden relative group transition"
                >
                  {/* Image */}
                  <img
                    src={tip.img}
                    alt={tip.title}
                    className="w-full h-[70%] object-cover"
                  />
                  {/* Title + Desc */}
                  <div className="p-4 h-[30%] bg-white">
                    <h3 className="text-lg font-bold text-gray-800">{tip.title}</h3>
                    <p className="text-sm text-gray-600">{tip.desc}</p>
                  </div>
                  {/* Details overlay */}
                  {hovered === tip.id && (
                    <div className="absolute inset-0 p-4 bg-white/95 overflow-y-auto rounded-2xl">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {tip.title}
                      </h3>
                      <p className="text-sm text-gray-600 whitespace-pre-line">
                        {tip.details}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Infinite scroll mode
            <motion.div
              className="flex gap-8"
              animate={paused ? {} : { x: ["0%", "-100%"] }}
              transition={{
                duration: 30, // slower, smoother
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {visibleTips.map((tip, i) => (
                <div
                  key={i}
                  onMouseEnter={() => {
                    setHovered(tip.id);
                    setPaused(true);
                  }}
                  onMouseLeave={() => {
                    setHovered(null);
                    setPaused(false);
                  }}
                  className="flex-none w-[300px] h-[390px] rounded-2xl shadow-xl bg-white overflow-hidden relative group transition"
                >
                  <img
                    src={tip.img}
                    alt={tip.title}
                    className="w-full h-[75%] object-cover"
                  />
                  <div className="p-4 h-[25%] bg-white">
                    <h3 className="text-lg font-bold text-gray-800">{tip.title}</h3>
                    <p className="text-sm text-gray-600">{tip.desc}</p>
                  </div>
                  {hovered === tip.id && (
                    <div className="absolute inset-0 p-4 bg-white/95 overflow-y-auto rounded-2xl">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {tip.title}
                      </h3>
                      <p className="text-sm text-gray-600 whitespace-pre-line">
                        {tip.details}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
