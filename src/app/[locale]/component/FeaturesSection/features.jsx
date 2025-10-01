"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaDumbbell,
  FaUtensils,
  FaChartLine,
  FaBullseye,
  FaClipboardCheck,
  FaRobot,
  FaGamepad,
  FaSpa,
  FaGlobe,
} from "react-icons/fa";
import { useTranslations } from "next-intl";

function FeaturesSection() {
  const t = useTranslations("home.featuresSection");

  const features = [
    {
      icon: <FaUser className="text-3xl" />,
      title: t("userProfile.title"),
      description: t("userProfile.description"),
      color: "bg-pink-500",
    },
    {
      icon: <FaDumbbell className="text-3xl" />,
      title: t("aiWorkout.title"),
      description: t("aiWorkout.description"),
      color: "bg-indigo-500",
    },
    {
      icon: <FaUtensils className="text-3xl" />,
      title: t("aiNutrition.title"),
      description: t("aiNutrition.description"),
      color: "bg-green-500",
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: t("progressTracking.title"),
      description: t("progressTracking.description"),
      color: "bg-yellow-500",
    },
    {
      icon: <FaBullseye className="text-3xl" />,
      title: t("goalSetting.title"),
      description: t("goalSetting.description"),
      color: "bg-purple-500",
    },
    {
      icon: <FaClipboardCheck className="text-3xl" />,
      title: t("logging.title"),
      description: t("logging.description"),
      color: "bg-teal-500",
    },
    {
      icon: <FaRobot className="text-3xl" />,
      title: t("fitnessBot.title"),
      description: t("fitnessBot.description"),
      color: "bg-red-500",
    },
    {
      icon: <FaGamepad className="text-3xl" />,
      title: t("gamification.title"),
      description: t("gamification.description"),
      color: "bg-blue-500",
    },
    {
      icon: <FaSpa className="text-3xl" />,
      title: t("wellness.title"),
      description: t("wellness.description"),
      color: "bg-fuchsia-500",
    },
    {
      icon: <FaGlobe className="text-3xl" />,
      title: t("multiLanguage.title"),
      description: t("multiLanguage.description"),
      color: "bg-gray-700",
    },
  ];

  return (
    <section className="relative py-10 bg-[#f3f4f7] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl py-2 font-extrabold tracking-wide 
          bg-gradient-to-r from-gray-800 via-slate-700 to-blue-600 
          text-transparent bg-clip-text animate-gradient"
        >
          {t("heading")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-4 mb-7 text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed py-2"
        >
          {t("subtitle")}
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="relative h-full rounded-2xl bg-white shadow-md hover:shadow-xl transition-all"
            >
              <div className="h-full bg-white rounded-2xl p-8 flex items-start gap-5">
                {/* Floating Icon */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className={`flex-shrink-0 p-4 rounded-full text-white shadow-md ${feature.color}`}
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <div className="text-left space-y-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
