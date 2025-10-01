"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useTranslations } from "next-intl";

export default function GoodLife() {
  const t = useTranslations("home.goodLife");

  // Parse categories from comma-separated string
  const categories = t("categories").split(",");

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [manualCategory, setManualCategory] = useState(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(null);

  // Auto button highlight
  useEffect(() => {
    if (manualCategory) return;

    let index = 0;
    const interval = setInterval(() => {
      setActiveCategory(categories[index % categories.length]);
      index++;
    }, 6000);

    return () => clearInterval(interval);
  }, [manualCategory, categories]);

  // Build tips dynamically from flattened keys
  const tipCount = 9; // total tips
  const allTips = Array.from({ length: tipCount }, (_, i) => {
    const id = i + 1;
    return {
      id,
      category: t(`tip${id}_category`),
      title: t(`tip${id}_title`),
      desc: t(`tip${id}_desc`),
      details: t(`tip${id}_details`),
      img: `/images/image-${id}.png`, // keep your existing images
    };
  });

  // Filter tips by current category
  const visibleTips = manualCategory
    ? allTips.filter((t) => t.category === manualCategory)
    : [...allTips, ...allTips, ...allTips, ...allTips]; // repeat 4x for smooth infinite scroll

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
            text-transparent bg-clip-text animate-gradient">
            {t("heading")}
          </h2>
          <p className="mt-4 mb-7 text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
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
                duration: 30,
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
