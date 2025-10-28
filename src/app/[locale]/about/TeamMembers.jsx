"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CiGlobe } from "react-icons/ci";

// Team data
const team = [
	{
		name: "Nafiz Uddowla",
		role: "fullstack",
		img: "https://i.ibb.co.com/9HS1jfw1/blue.jpg",
		social: {
			portfolio: "https://nafiz64-portfolio.vercel.app/",
			linkedin: "https://www.linkedin.com/in/nafiz64/",
			github: "https://github.com/Nakib64",
		},
	},
	{
		name: "Mughni Rayhan",
		role: "fullstack",
		img: "https://i.ibb.co.com/My365Xrs/Whats-App-Image-2025-10-27-at-22-40-33-8b9969ed.jpg",
		social: {
			portfolio: "https://lustrous-mermaid-45509f.netlify.app/",
			linkedin: "https://www.linkedin.com/in/mughnirayhan/",
			github: "https://github.com/MughniRayhan",
		},
	},
	{
		name: "Abid Hasan Ayon",
		role: "frontend",
		img: "https://i.ibb.co.com/zVXjdGjP/ayon.jpg",
		social: { portfolio: "https://abidayon.vercel.app/", linkedin: "https://www.linkedin.com/in/abid-hasan-ayon/", github: "https://github.com/Ayon203008" },
	},
	{
		name: "Saklain Mostak",
		role: "fullstack",
		img: "https://i.ibb.co.com/9FyVLq8/Whats-App-Image-2025-10-20-at-00-40-23-e4aced24-1-1.jpg",
		social: { portfolio: "https://saklain-porfolio.netlify.app/", linkedin: "https://www.linkedin.com/in/saklain-mostak/", github: "https://github.com/saklain10" },
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
				className="max-w-6xl mx-auto px-4 py-10 flex flex-col justify-center min-h-96"
			>
				{slides.map((member, idx) => (
					<SwiperSlide key={idx} className="transition-all duration-500 py-6">
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
							<h3 className="text-lg md:text-xl font-semibold text-gray-800">
								{member.name}
							</h3>
							<p className="text-lime-600 font-medium mb-2">
								{t(`roles.${member.role}`)}
							</p>

							{/* Social overlay */}
							<div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
								<div className="flex space-x-4 mb-4">
									<a
										href={member.social.portfolio}
										target="_blank"
										rel="noopener noreferrer"
									>
										<CiGlobe
											size={24}
											className="text-white hover:text-blue-400 transition"
										/>
									</a>
									<a
										href={member.social.linkedin}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Linkedin
											size={24}
											className="text-white hover:text-blue-500 transition"
										/>
									</a>
									<a
										href={member.social.github}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Github
											size={24}
											className="text-white hover:text-gray-300 transition"
										/>
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
