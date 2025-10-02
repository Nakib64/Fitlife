'use client';

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Twitter, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// Team data
const team = [
  {
    name: "Nafiz Nakib",
    role: "fullstack",
    img: "https://i.ibb.co/5Yb6b9R/team1.jpg",
    social: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Sarah Johnson",
    role: "uiux",
    img: "https://i.ibb.co/2k2fG7S/team2.jpg",
    social: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Alex Chen",
    role: "ai",
    img: "https://i.ibb.co/Y0Z9FbF/team3.jpg",
    social: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Priya Singh",
    role: "frontend",
    img: "https://i.ibb.co/0CJqFhD/team4.jpg",
    social: { twitter: "#", linkedin: "#", github: "#" },
  },
];

const TeamSwiper = () => {
  const t = useTranslations("about.team");

  // Duplicate slides for smooth loop
  const slides = [...team, ...team];

  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-lime-600 mb-10">
        {t("heading")}
      </h2>

      <Swiper
        modules={[Autoplay, EffectCoverflow]}
        effect="coverflow"
        centeredSlides={true}
        slidesPerView={1.2}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 4 },
        }}
        coverflowEffect={{
          rotate: 15,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        className="max-w-6xl mx-auto px-4"
      >
        {slides.map((member, idx) => (
          <SwiperSlide key={idx} className="transition-all duration-500">
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center relative group"
              whileHover={{ y: -5 }}
            >
              <motion.img
                src={member.img}
                alt={member.name}
                className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover ring-4 ring-indigo-200 mb-4"
                whileHover={{
                  rotate: [0, -2, 2, -2, 2, 0],
                  transition: { repeat: Infinity, duration: 1, ease: "easeInOut" },
                }}
              />
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-indigo-600 font-medium mb-2">{t(`roles.${member.role}`)}</p>

              {/* Social overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                <div className="flex space-x-4 mb-4">
                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter size={24} className="text-white hover:text-blue-400 transition" />
                  </a>
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin size={24} className="text-white hover:text-blue-500 transition" />
                  </a>
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                    <Github size={24} className="text-white hover:text-gray-300 transition" />
                  </a>
                </div>
                <h3 className="text-white text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-200">{t(`roles.${member.role}`)}</p>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TeamSwiper;
