"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { use } from "react";

const blogs = {
  1: {
    title: "5 Morning Habits to Boost Your Energy",
    content: `
Mornings set the tone for the entire day. Here are 5 habits to energize your mornings:

1. Drink water after waking up.
2. Do 5 minutes of stretching or yoga.
3. Avoid checking your phone immediately.
4. Eat a protein-rich breakfast.
5. Spend a moment practicing gratitude.
    `,
    image: "/blogs-images/image1.jpg",
    date: "Sept 15, 2025",
    author: "Wellness Coach",
  },
  2: {
    title: "The Importance of Quality Sleep",
    content: `
Sleep is essential for recovery, focus, and overall health.

- Aim for 7–8 hours each night.
- Avoid caffeine late in the evening.
- Create a relaxing bedtime routine.
- Keep your bedroom cool and dark.
    `,
    image: "/blogs-images/image2.jpg",
    date: "Sept 14, 2025",
    author: "Health Expert",
  },
  3: {
    title: "Healthy Eating on a Busy Schedule",
    content: `
Busy lifestyle? No problem! Here are tips:

- Prep meals on weekends.
- Carry healthy snacks like nuts or fruits.
- Avoid skipping breakfast.
- Choose water over sugary drinks.
    `,
    image: "/blogs-images/image3.jpg",
    date: "Sept 10, 2025",
    author: "Nutritionist",
  },
};

export default function BlogDetails({ params }) {
  const { id } = use(params);
  const blog = blogs[id];

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Blog not found.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Hero Image with overlay */}
        <div className="relative w-full h-72 md:h-96 mb-8 rounded-3xl overflow-hidden shadow-lg">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        {/* Title and meta */}
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {blog.title}
        </motion.h1>

        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between text-gray-500 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm md:text-base">
            {blog.date} • {blog.author}
          </p>
          <div className="hidden md:block border-b border-gray-300 w-full mx-4"></div>
        </motion.div>

        {/* Content card */}
        <motion.div
          className="bg-[#e1f0e5] p-8 rounded-2xl shadow-lg  max-w-full mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {blog.content.split("\n").map((para, i) => (
            <p key={i} className="leading-relaxed">
              {para}
            </p>
          ))}
        </motion.div>

        {/* Back button */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/wellness"
            className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-md hover:bg-green-600 transition-colors duration-300"
          >
            ← Back to Articles
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
