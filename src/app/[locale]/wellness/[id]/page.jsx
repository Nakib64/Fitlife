"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    if (id) fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-gray-500 text-lg"
        >
          Loading article...
        </motion.p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 pb-20">
      {/* Header / Hero */}
      <div className="relative w-full h-[400px] md:h-[600px]">
        {blog.coverImage && (
          <Image
            src={blog.coverImage}
            alt={blog.title || "Blog cover"}
            fill
            className="object-cover rounded-b-3xl shadow-lg"
          />
        )}
        <div className="absolute inset-0 bg-black/70 rounded-b-3xl flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-8"
          >
            <h1 className="text-4xl md:text-7xl  font-bold text-white drop-shadow-lg">
              {blog.title}
            </h1>
            <p className="text-gray-200 mt-3 text-lg">
              {new Date(blog.createdAt).toLocaleDateString()} •{" "}
              {blog.author || "Admin"}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mt-12 flex flex-col md:flex-row gap-10">
        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-3/4"
        >
          {/* Summary */}
          {blog.summary && (
            <p className="text-lg text-gray-700 mt-4 leading-relaxed whitespace-pre-line  mb-12">
              {blog.summary}
            </p>
          )}

          {/* Sections */}
          <div className="space-y-16">
            {blog.sections?.map((section, i) => (
              <motion.div
                key={i}
                id={`section-${i}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="scroll-mt-24"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-green-700 mb-6">
                  {section.heading}
                </h2>

                {section.image && (
                  <div className="relative w-full h-[300px] md:h-[400px] mb-6">
                    <Image
                      src={section.image}
                      alt={section.title || "Section image"}
                      fill
                      className=" object-cover shadow-lg"
                    />
                  </div>
                )}

                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Navigation */}
<motion.aside     
  initial={{ opacity: 0, }}
  whileInView={{ opacity: 1,  }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="md:w-1/4 bg-white shadow-xl pl-8  p-6 h-fit sticky top-24 border border-gray-100 overflow-hidden"
>
  <h3 className="text-xl font-bold text-gray-800 mb-6">
    In This Article
  </h3>
  <ul className="space-y-4">
    {blog.sections?.map((section, i) => (
      <motion.li
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        className="cursor-pointer text-gray-600 hover:text-green-600 transition-colors duration-200 list-disc "
        onClick={() => {
          document
            .getElementById(`section-${i}`)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      >
        <span className="inline-block border-l-4 border-transparent pl-2 hover:border-green-500 transition-all underline mt-3">
          {section.heading}
        </span>
      </motion.li>
    ))}
  </ul>
</motion.aside>

      </div>
    </section>
  );
}
