"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Dumbbell, Heart, MessageCircle, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Animation variants (no changes here)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (custom) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 10,
      delay: custom * 0.2 + 0.5,
    },
  }),
};

const Hero = () => {

  const t = useTranslations("home.hero");
  return (
    <section className="overflow-hidden pb-10">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Side */}
        <div className="text-center lg:text-left mb-20">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-zinc-900 leading-tight"
            variants={itemVariants}
          >
            {t('title')}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-md mx-auto lg:mx-0 text-lg text-zinc-600"
            variants={itemVariants}
          >
            {t('des')}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            variants={itemVariants}
          >
            <Link className="w-full sm:w-auto bg-lime-400 text-zinc-900 font-bold px-8 py-4 rounded-full text-lg hover:bg-lime-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2">
              {t("btn")}
            </Link>
          </motion.div>
        </div>

        {/* Right Side*/}
        <motion.div
          className="relative h-[500px] md:h-[600px] flex items-center justify-center"
          variants={itemVariants}
        >
          <motion.div
            className="relative w-[350px] h-[700px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <video
              src="/hero-section/hero-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[96%] w-[94%] object-cover rounded-[50px]"
            ></video>

            <Image
              src="/hero-section/phone-image.webp"
              alt="Phone Frame"
              fill
              className="z-10 object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>

          <FloatingCard
            className="top-10 right-4 sm:right-16 md:right-50 lg:right-12"
            customDelay={1}
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center text-xs text-green-500 font-bold mb-2">
                <Zap size={16} className="mr-1 fill-green-500" />
                <span>FitLife</span>
              </div>
              <p className="text-4xl font-bold text-zinc-800">32:12</p>
              <p className="text-sm text-zinc-500">time</p>
              <div className="flex items-center text-red-500 mt-2">
                <Heart size={16} className="mr-1 fill-red-500" />
                <span className="font-semibold">147</span>
                <span className="text-xs ml-1">bpm</span>
              </div>
            </div>
          </FloatingCard>
          <FloatingCard
            className="top-24 left-6 sm:left-12 md:left-32 lg:-left-0"
            customDelay={2}
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-full mr-3">
                <MessageCircle size={20} className="text-green-600" />
              </div>
              <p className="text-sm font-medium text-zinc-700">
                {t("subtitle")}
              </p>
            </div>
          </FloatingCard>
          <FloatingCard
            className="bottom-8 right-2 sm:right-10 md:right-40 lg:-right-0"
            customDelay={3}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <Dumbbell size={20} className="mr-2 text-zinc-600" />
                <span className="font-semibold text-zinc-800">Dumbbells</span>
              </div>
              <div className="w-5 h-5 bg-zinc-800 rounded-md flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            </div>
          </FloatingCard>
          <FloatingCard
            className="bottom-20 left-4 sm:left-14 md:left-48 lg:left-0"
            customDelay={4}
          >
            <p className="text-sm text-zinc-500">Lean mass</p>
            <p className="text-2xl font-bold text-zinc-800 mt-1">
              97 lb <span className="text-green-500 text-lg">↑</span>
            </p>
          </FloatingCard>
        </motion.div>
      </motion.div>
    </section>
  );
};

const FloatingCard = ({ children, className, customDelay }) => (
  <motion.div
    className={`absolute bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg z-20 ${className}`}
    variants={cardVariants}
    custom={customDelay}
  >
    {children}
  </motion.div>
);

export default Hero;