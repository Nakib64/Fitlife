"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

export const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
  const [active, setActive] = useState(0);
  const [rotations, setRotations] = useState([]);

  const handleNext = () =>
    setActive((prev) => (prev + 1) % testimonials.length);

  const handlePrev = () =>
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const generated = testimonials.map(
      () => Math.floor(Math.random() * 21) - 10
    );
    setRotations(generated);
  }, [testimonials]);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const isActive = (index) => index === active;

  if (rotations.length === 0) return null; // wait until rotations generated

  return (
    <div className="w-full bg-gradient-to-r from-gray-100 via-white to-gray-100 py-20">
      <div className="mx-auto max-w-6xl px-4 font-sans antialiased md:px-8 lg:px-12">
        {/* --- Section Heading --- */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Clients Say
          </h2>
          <p className="mt-2 text-gray-600">
            Real feedback from people who’ve experienced the difference
          </p>
        </div>

        {/* --- Testimonial Card --- */}
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-200">
          {/* --- IMAGE SIDE --- */}
          <div className="relative">
            <div className="relative h-80 w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-indigo-500 via-pink-500 to-yellow-400 p-[3px] hover:scale-105 transition-transform duration-300">
              <div className="h-full w-full rounded-2xl overflow-hidden bg-white">
                <AnimatePresence>
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.src}
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                        z: -100,
                        rotate: rotations[index],
                      }}
                      animate={{
                        opacity: isActive(index) ? 1 : 0,
                        scale: isActive(index) ? 1 : 0.95,
                        z: isActive(index) ? 0 : -100,
                        rotate: isActive(index) ? 0 : rotations[index],
                        zIndex: isActive(index)
                          ? 40
                          : testimonials.length + 2 - index,
                        y: isActive(index) ? [0, -40, 0] : 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        z: 100,
                        rotate: rotations[index],
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 origin-bottom"
                    >
                      <Image
                        src={testimonial.src}
                        alt={testimonial.name}
                        width={500}
                        height={500}
                        draggable={false}
                        className="h-full w-full object-cover object-center"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* --- TEXT SIDE --- */}
          <div className="flex flex-col justify-between py-4">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-3">
                <FaQuoteLeft className="text-indigo-400 text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">
                  {testimonials[active].name}
                </h3>
              </div>
              <p className="text-sm text-gray-500">
                {testimonials[active].designation}
              </p>

              {/* Animated quote */}
              <motion.p className="mt-6 text-lg text-gray-600 leading-relaxed">
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ filter: "blur(8px)", opacity: 0, y: 6 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                      delay: 0.015 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>

              {/* ⭐ Rating stars */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                className="mt-4 flex text-yellow-400"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < testimonials[active].rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Buttons + Progress */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mt-10">
              <div className="flex gap-4">
                <button
                  onClick={handlePrev}
                  className="group/button flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12" />
                </button>
                <button
                  onClick={handleNext}
                  className="group/button flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12" />
                </button>
              </div>

              {/* Progress Bars */}
              <div className="flex gap-2 justify-center flex-wrap">
                {testimonials.map((_, i) => (
                  <motion.div
                    key={i}
                    className={`h-2 rounded-full ${
                      i === active ? "bg-indigo-500 w-6" : "bg-gray-300 w-2"
                    }`}
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
