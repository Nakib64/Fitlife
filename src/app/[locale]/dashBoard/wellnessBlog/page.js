"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Trash2, Upload, Save } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function WellnessBlog() {
  const router = useRouter();
  const [sections, setSections] = useState([
    { heading: "", content: "", image: "" },
  ]);

  const [mainBlog, setMainBlog] = useState({
    title: "",
    category: "",
    coverImage: "",
    summary: "",
  });

  // Add a new section
  const addSection = () => {
    setSections([...sections, { heading: "", content: "", image: "" }]);
  };

  // Remove a section
  const removeSection = (index) => {
    const updated = sections.filter((_, i) => i !== index);
    setSections(updated);
  };

  // Handle blog submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = { ...mainBlog, sections };

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });

    if (res.ok) {
      toast("✅ Blog created successfully!");
      setMainBlog({ title: "", category: "", coverImage: "", summary: "" });
      setSections([{ heading: "", content: "", image: "" }]);

      router.push("/wellness");

    } else {
      toast("❌ Failed to create blog.");
    }
  };

  return (
    <section className="min-h-screen  py-12 px-4 md:px-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ✍️ Create a Wellness Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Blog Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Blog Title
              </label>
              <input
                type="text"
                placeholder="Enter blog title"
                value={mainBlog.title}
                onChange={(e) =>
                  setMainBlog({ ...mainBlog, title: e.target.value })
                }
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Category
              </label>
              <input
                type="text"
                placeholder="e.g. Nutrition, Fitness, Mindfulness"
                value={mainBlog.category}
                onChange={(e) =>
                  setMainBlog({ ...mainBlog, category: e.target.value })
                }
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">
                Cover Image URL
              </label>
              <input
                type="text"
                placeholder="https://example.com/cover.jpg"
                value={mainBlog.coverImage}
                onChange={(e) =>
                  setMainBlog({ ...mainBlog, coverImage: e.target.value })
                }
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">
                Short Summary
              </label>
              <textarea
                placeholder="Write a short introduction for the blog..."
                rows={3}
                value={mainBlog.summary}
                onChange={(e) =>
                  setMainBlog({ ...mainBlog, summary: e.target.value })
                }
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          {/* Dynamic Blog Sections */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              📑 Blog Sections
            </h2>

            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative mb-8 p-6 border border-gray-200 rounded-xl bg-gray-50"
              >
                <button
                  type="button"
                  onClick={() => removeSection(index)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      placeholder="Enter section heading"
                      value={section.heading}
                      onChange={(e) => {
                        const updated = [...sections];
                        updated[index].heading = e.target.value;
                        setSections(updated);
                      }}
                      className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Description
                    </label>
                    <textarea
                      placeholder="Write the section details..."
                      rows={4}
                      value={section.content}
                      onChange={(e) => {
                        const updated = [...sections];
                        updated[index].content = e.target.value;
                        setSections(updated);
                      }}
                      className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Optional Image URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://example.com/section.jpg"
                      value={section.image}
                      onChange={(e) => {
                        const updated = [...sections];
                        updated[index].image = e.target.value;
                        setSections(updated);
                      }}
                      className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            <button
              type="button"
              onClick={addSection}
              className="flex items-center gap-2 px-4 py-2 mt-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-600 hover:text-white transition"
            >
              <PlusCircle size={18} />
              Add New Section
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition font-medium"
            >
              <Save size={20} />
              Publish Blog
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
