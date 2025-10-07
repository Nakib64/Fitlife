"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function WellnessTips() {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ["All", "Fitness", "Nutrition", "Sleep", "Mindfulness"];

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Filter blogs by category
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

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="text-lg text-gray-600"
              >
                ⏳ Loading articles...
              </motion.div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center text-red-600 font-medium">
              Failed to load blogs: {error}
            </div>
          )}

          {/* Blogs Timeline */}
          {!loading && !error && (
            <div className="relative border-l-2 border-gray-300">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog, index) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="mb-12 ml-6 relative"
                  >
                    {/* Dot on timeline */}
                    <span className="absolute -left-3 top-4 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></span>

                    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
                      {blog.coverImage && (
                        <Image
                          src={blog.coverImage}
                          alt={blog.title}
                          width={160}
                          height={128}
                          className="rounded-xl shadow object-cover"
                        />
                      )}
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                          {blog.title}
                        </h2>
                        <p className="text-sm text-gray-500 mb-2">
                          {new Date(blog.createdAt).toLocaleDateString()} •{" "}
                          {blog.author || "Admin"}
                        </p>
                        <p className="text-gray-600">
                          {blog.summary?.slice(0, 120)}...
                        </p>
                        <Link
                          href={`/wellness/${blog._id}`}
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
                    There are no articles under the "{selectedCategory}" category
                    at the moment. Try exploring other categories.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
