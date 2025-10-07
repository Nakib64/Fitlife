"use client";

import { motion } from "framer-motion";
import {
  UserRoundCheck,
  Dumbbell,
  Apple,
  Target,
  NotebookPen,
  Bot
} from "lucide-react";
import { useTranslations } from "next-intl";

const icons = [
  UserRoundCheck,
  Dumbbell,
  Apple,
  Target,
  NotebookPen,
  Bot
];

// Card hover animation
const cardVariants = {
  hover: { y: -5, boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)" },
};

// Icon hover animation
const iconVariants = {
  hover: {
    x: [0, -4, 4, -4, 4, 0],
    transition: {
      repeat: Infinity,
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

export default function FeaturesGrid() {
  const t = useTranslations("about.features");
  const features = t.raw("list"); // get the array directly from JSON

  return (
    <section className="py-16 bg-gray-50">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {t("heading")}
        </h2>
        <p className="text-lg text-gray-600">{t("subHeading")}</p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        {features.map((feature, index) => {
          const Icon = icons[index];
          return (
            <motion.div
              key={index}
              className="flex flex-col p-6 bg-white rounded-xl shadow-md cursor-pointer hover:shadow-lg transition"
              whileHover="hover"
              variants={cardVariants}
              transition={{ duration: 0.3 }}
            >
              {/* Icon + Title */}
              <div className="flex items-center mb-4 space-x-4">
                <motion.div
                  className="flex-shrink-0 w-12 h-12 flex justify-center items-center bg-indigo-100 rounded-full"
                  variants={iconVariants}
                >
                  <Icon size={28} className="text-lime-700" />
                </motion.div>
                <h3 className="text-2xl font-extrabold text-gray-600">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-500">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
