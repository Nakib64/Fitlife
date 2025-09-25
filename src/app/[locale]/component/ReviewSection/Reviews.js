"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const reviews = [
  {
    name: "Sofia Ramirez",
    role: "Fitness Instructor",
    review:
      "From the first day, Eliot has made me more comfortable and confident in my fitness training with him. After 8 months, I have seen great progress — lost weight and gained muscle.",
    title: "Great experience first time with fitness",
    rating: 5,
    img: "/ReviewImage/image1.jpeg",
  },
  {
    name: "James Parker",
    role: "Software Engineer",
    review:
      "This isn’t just about nutrition — it’s a complete lifestyle shift. The mentoring sessions gave me the motivation and tools I needed to stay consistent, and I’ve never felt better.",
    title: "Professional and science based course",
    rating: 5,
    img: "/ReviewImage/image4.jpeg",
  },
  {
    name: "Floyd Miles",
    role: "Sales Director",
    review:
      "I’ve tried many fitness programs before, but this one actually made a difference. The support and clear instructions helped me stay consistent and see real progress!",
    title: "The Results Speak for Themselves!",
    rating: 5,
    img: "/ReviewImage/image1.jpeg",
  },
  {
    name: "Emily Watson",
    role: "Yoga Instructor",
    review:
      "The coaching sessions were incredible. I learned to balance fitness with my lifestyle, and the progress has been amazing!",
    title: "Life-changing experience",
    rating: 5,
    img: "/ReviewImage/image3.jpeg",
  },
  {
    name: "Michael Brown",
    role: "Entrepreneur",
    review:
      "Amazing guidance and support! The structured program helped me transform my health in just a few months.",
    title: "Highly recommend this program",
    rating: 5,
    img: "/ReviewImage/image4.jpeg",
  },
];

export default function PremiumReviews() {
  const [paused, setPaused] = useState(false);
  const allReviews = [...reviews, ...reviews]; // duplicate for loop effect

  return (
    <section className="py-10 w-full bg-[#f3f4f7]">
      {/* Section Title */}
      <div className="text-center mb-14 px-4">
        <p className="text-sm md:text-base tracking-wider font-semibold mb-4 text-green-600 uppercase">
          What Clients Say
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide 
  bg-gradient-to-r from-gray-800 via-slate-700 to-blue-600 
  text-transparent bg-clip-text animate-gradient">
          Real Stories, Real Results
        </h1>
        <p className="mt-4 mb-7 text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Thousands of clients worldwide have trusted our program to transform
          their health and fitness journey.
        </p>
      </div>

      {/* Infinite Marquee */}
      <div
        className="overflow-hidden w-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          className="flex gap-4 px-4"
          animate={{ x: paused ? 0 : ["0%", "-100%"] }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {allReviews.map((review, idx) => (
            <div
              key={idx}
              className="flex-none w-[80%] sm:w-[45%] md:w-[30%] rounded-2xl border border-gray-200 hover:-translate-y-2 transition-transform duration-500 flex flex-col"
              style={{ backgroundColor: "#F4F9F9" }}
            >
              {/* Top Section */}
              <div className="flex items-center justify-between p-4 rounded-t-2xl bg-white">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={review.img}
                      alt={review.name}
                      fill
                      className="rounded-full object-cover ring-4 ring-green-100 shadow-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 flex items-center gap-1">
                      {review.name}
                      <FaCheckCircle className="text-green-500" />
                    </h3>
                    <p className="text-sm text-gray-800">{review.role}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="text-yellow-400 text-lg font-bold">
                  {"★".repeat(review.rating)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="bg-white rounded-xl p-6 shadow-sm flex-1 flex flex-col">
                  <h4 className="font-semibold text-lg text-gray-900 mb-3">
                    {review.title}
                  </h4>
                  <p className="text-gray-800 text-base leading-relaxed flex-1">
                    {review.review}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Stats */}
      <div className="mt-12 text-center space-y-4">
        <div
          className="inline-block px-8 py-4 text-lg font-semibold text-gray-900 rounded-full shadow-md"
          style={{
            background:
              "linear-gradient(to right, #cbff5b, #baff47, #a9f23c)",
          }}
        >
          ★ 4.9 Rating From 12k+ Reviews
        </div>
        <p className="text-gray-900 text-lg md:text-xl font-medium">
          Trusted by <span className="font-bold">12,000+</span> clients | Serving in{" "}
          <span className="font-bold">8+ countries</span>
        </p>
      </div>
    </section>
  );
}
