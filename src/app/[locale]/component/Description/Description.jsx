"use client";

import { motion } from "framer-motion";
import { FiActivity } from "react-icons/fi";
import { GiMeal } from "react-icons/gi";
import { MdSelfImprovement } from "react-icons/md";
import { useTranslations } from "next-intl";

export default function Description() {
  const t = useTranslations("home.description");

  // Animation Variants
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 12 },
    },
  };

  // Features (text comes from JSON)
  const features = [
    {
      icon: <FiActivity className="text-3xl text-indigo-600" />,
      title: t("features.0.title"),
      desc: t("features.0.desc"),
      color: "from-indigo-100 to-indigo-200",
    },
    {
      icon: <GiMeal className="text-3xl text-green-600" />,
      title: t("features.1.title"),
      desc: t("features.1.desc"),
      color: "from-green-100 to-green-200",
    },
    {
      icon: <MdSelfImprovement className="text-3xl text-pink-600" />,
      title: t("features.2.title"),
      desc: t("features.2.desc"),
      color: "from-pink-100 to-pink-200",
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariant}
      className="relative w-full overflow-hidden bg-[#f3f4f7]"
    >
      {/* Heading */}
      <motion.div variants={cardVariant} className="py-10 text-center">
        <h2
          className="text-4xl md:text-6xl font-extrabold tracking-wide 
          bg-gradient-to-r from-gray-800 via-slate-700 to-blue-600 
          text-transparent bg-clip-text animate-gradient"
        >
          {t("heading")}
        </h2>
        <p className="mt-4 text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {t("subHeading")}
        </p>
      </motion.div>

    
      {/* Main Content */}
      <div className="pb-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.p
              variants={cardVariant}
              className="text-gray-700 mb-8 text-lg leading-relaxed max-w-2xl"
            >
              {t("intro")}
            </motion.p>

            {/* Feature Cards */}
            <motion.div
              variants={containerVariant}
              className="space-y-8 max-w-xl"
            >
              {features.map((card, i) => (
                <motion.div
                  key={i}
                  variants={cardVariant}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 250, damping: 15 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-xl hover:shadow-2xl flex items-start gap-6"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`flex-shrink-0 p-4 rounded-full shadow-md bg-gradient-to-tr ${card.color}`}
                  >
                    {card.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 tracking-wide">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 mt-2 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={cardVariant}
              className="flex gap-3 mt-10 flex-wrap"
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.97 }}
                className="relative w-40 h-14 bg-black rounded-xl shadow-lg flex items-center justify-center hover:opacity-90 transition"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-10"
                />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.97 }}
                className="relative w-40 h-14 bg-black rounded-xl shadow-lg flex items-center justify-center hover:opacity-90 transition"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  className="h-10"
                />
              </motion.a>
            </motion.div>
            
          </div>

          {/* Right Images */}
          <motion.div
            variants={cardVariant}
            className="relative flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-5"
            >
              <motion.img
                src="https://i.ibb.co.com/99WCQ6D6/m1t.png"
                alt="FitLife workout"
                className="w-80 md:w-96 rounded-2xl"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
              />
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-5 absolute top-14 -right-6 hidden md:block"
            >
              <motion.img
                src="https://i.ibb.co.com/twpVrfkj/m2t.png"
                alt="FitLife meals"
                className="w-64 md:w-80 rounded-2xl"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
