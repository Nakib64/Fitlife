"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const blogs = [
  {
    id: 1,
    title: "5 Morning Habits to Boost Your Energy",
    content: `Mornings set the tone for the entire day. Here are 5 habits to energize your mornings:
    1. Drink water after waking up.
    2. Do 5 minutes of stretching or yoga.
    3. Avoid checking your phone immediately.
    4. Eat a protein-rich breakfast.
    5. Spend a moment practicing gratitude.`,
    image: "/blogs-images/image1.jpg",
    date: "Sept 15, 2025",
    author: "Wellness Coach",
    category: "Fitness",
  },
  {
    id: 2,
    title: "The Importance of Quality Sleep",
    content: `Sleep is essential for recovery, focus, and overall health.
    - Aim for 7–8 hours each night.
    - Avoid caffeine late in the evening.
    - Create a relaxing bedtime routine.
    - Keep your bedroom cool and dark.`,
    image: "/blogs-images/image2.jpg",
    date: "Sept 14, 2025",
    author: "Health Expert",
    category: "Sleep",
  },
  {
    id: 3,
    title: "Healthy Eating on a Busy Schedule",
    content: `Busy lifestyle? No problem! Here are tips:
    - Prep meals on weekends.
    - Carry healthy snacks like nuts or fruits.
    - Avoid skipping breakfast.
    - Choose water over sugary drinks.`,
    image: "/blogs-images/image3.jpg",
    date: "Sept 10, 2025",
    author: "Nutritionist",
    category: "Nutrition",
  },
];

export default function WellnessTips() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Fitness", "Nutrition", "Sleep", "Mindfulness"];

  // filter blogs
  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === selectedCategory);

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        <aside className="md:w-1/4 bg-white rounded-2xl shadow-md p-6 md:sticky md:top-24 self-start">
  <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
  <ul className="space-y-3 text-gray-600">
    {categories.map((cat) => (
      <li
        key={cat}
        className={`cursor-pointer ${
          selectedCategory === cat
            ? "text-green-600 font-semibold"
            : "hover:text-green-600"
        }`}
        onClick={() => setSelectedCategory(cat)}
      >
        {cat}
      </li>
    ))}
  </ul>

  <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">
    Popular Tags
  </h2>
  <div className="flex flex-wrap gap-2">
    {["Energy", "Healthy", "Yoga", "Balance", "Focus"].map((tag, i) => (
      <span
        key={i}
        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm cursor-pointer hover:bg-green-200"
      >
        #{tag}
      </span>
    ))}
  </div>
</aside>


        {/* Blog Timeline */}
        <div className="md:w-3/4 w-full">
  <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center md:text-left">
    Wellness Articles
  </h1>

  <div className="relative border-l-2 border-gray-300">
    {filteredBlogs.length > 0 ? (
      filteredBlogs.map((blog, index) => (
        <motion.div
          key={blog.id}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="mb-12 ml-6 relative"
        >
          {/* Dot on timeline */}
          <span className="absolute -left-3 top-4 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></span>

          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
            <Image
              src={blog.image}
              alt={blog.title}
              width={160}
              height={128}
              className="rounded-xl shadow object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                {blog.date} • {blog.author}
              </p>
              {/* Preview text */}
              <p className="text-gray-600">
                {blog.content.slice(0, 120)}...
              </p>
              <Link
                href={`/wellness/${blog.id}`}
                className="inline-block mt-3 text-green-600 font-medium hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        </motion.div>
      ))
    ) : (
      <div className="w-full flex flex-col items-center justify-center text-center py-20 space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="text-6xl"
        >
          📰
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-800">
          No articles found
        </h3>
        <p className="text-gray-500">
          There are no articles under the "{selectedCategory}" category at the moment. Try exploring other categories.
        </p>
      </div>
    )}
  </div>
</div>

      </div>
    </section>
  );
}
