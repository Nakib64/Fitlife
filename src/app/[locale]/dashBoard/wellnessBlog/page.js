"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Save } from "lucide-react";

export default function WellnessBlog() {
  const router = useRouter();
  const [mainBlog, setMainBlog] = useState({
    title: "",
    category: "",
    summary: "",
    coverImage: "",
  });
  const [sections, setSections] = useState([{ heading: "", content: "", image: "" }]);
  const [uploading, setUploading] = useState(false);

  // ✅ Upload image immediately on file change
  const handleImageUpload = async (e, index = null, isCover = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    toast.loading("Uploading image...");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      toast.dismiss();

      if (data.success) {
        const imageUrl = data.data.url;
        if (isCover) {
          setMainBlog({ ...mainBlog, coverImage: imageUrl });
        } else {
          const updated = [...sections];
          updated[index].image = imageUrl;
          setSections(updated);
        }
        toast.success("✅ Image uploaded successfully!");
      } else {
        toast.error("❌ Failed to upload image.");
      }
    } catch {
      toast.error("⚠️ Something went wrong during upload.");
    } finally {
      setUploading(false);
    }
  };

  // Add and Remove Section
  const addSection = () => setSections([...sections, { heading: "", content: "", image: "" }]);
  const removeSection = (index) => setSections(sections.filter((_, i) => i !== index));

  // Submit blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = { ...mainBlog, sections };

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (res.ok) {
        toast.success("🎉 Blog published successfully!");
        setMainBlog({ title: "", category: "", summary: "", coverImage: "" });
        setSections([{ heading: "", content: "", image: "" }]);
        router.push("/wellness");
      } else {
        toast.error("❌ Failed to publish blog.");
      }
    } catch {
      toast.error("⚠️ Something went wrong.");
    }
  };

  return (
    <section className="min-h-screen w-full pb-16">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto"
      >
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-lime-600">
              ✍️ Create Wellness Blog
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* --- Blog Info --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Blog Title</Label>
                  <Input
                    placeholder="Enter blog title"
                    value={mainBlog.title}
                    onChange={(e) => setMainBlog({ ...mainBlog, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    placeholder="e.g. Fitness, Nutrition"
                    value={mainBlog.category}
                    onChange={(e) => setMainBlog({ ...mainBlog, category: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, null, true)}
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  {mainBlog.coverImage && (
                    <div className="relative w-full h-64 rounded-xl overflow-hidden mt-2 group">
                      <Image
                        src={mainBlog.coverImage}
                        alt="Cover"
                        fill
                        className="object-cover group-hover:scale-105 transition-all duration-300"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Short Summary</Label>
                <Textarea
                  placeholder="Write a short summary..."
                  rows={3}
                  value={mainBlog.summary}
                  onChange={(e) => setMainBlog({ ...mainBlog, summary: e.target.value })}
                  required
                />
              </div>

              {/* --- Blog Sections --- */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-lime-600">📄 Blog Sections</h2>

                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Section Heading</Label>
                        <Input
                          placeholder="Enter section heading"
                          value={section.heading}
                          onChange={(e) => {
                            const updated = [...sections];
                            updated[index].heading = e.target.value;
                            setSections(updated);
                          }}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Section Image</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, index)}
                          disabled={uploading}
                          className="cursor-pointer"
                        />
                        {section.image && (
                          <div className="relative w-full h-48 rounded-lg overflow-hidden mt-2 group">
                            <Image
                              src={section.image}
                              alt="Section"
                              fill
                              className="object-cover group-hover:scale-105 transition-all duration-300"
                            />
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Content</Label>
                        <Textarea
                          placeholder="Write section details..."
                          rows={4}
                          value={section.content}
                          onChange={(e) => {
                            const updated = [...sections];
                            updated[index].content = e.target.value;
                            setSections(updated);
                          }}
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}

                <Button
                  type="button"
                  onClick={addSection}
                  variant="outline"
                  className="flex items-center gap-2 border-lime-500 text-lime-600 hover:bg-lime-600 hover:text-white transition"
                >
                  <Plus className="w-4 h-4" /> Add New Section
                </Button>
              </div>

              {/* --- Submit --- */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-lime-600 hover:bg-lime-700 text-white flex items-center gap-2 shadow-md transition-transform hover:scale-105"
                >
                  <Save className="w-5 h-5" /> Publish Blog
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
