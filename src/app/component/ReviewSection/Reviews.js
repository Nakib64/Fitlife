import React from "react";
import Image from "next/image";

const reviews = [
  {
    name: "Sofia Ramirez",
    role: "Fitness Instructor",
    review:
      "From the first day, Eliot has made me more comfortable and confident in my fitness training with him. After 8 months, I have seen great progress — lost weight and gained muscle.",
    title: "Great first-time fitness experience",
    rating: 5,
    img: "https://i.ibb.co/FbcbczSB/men.jpg",
  },
  {
    name: "James Parker",
    role: "Software Engineer",
    review:
      "This isn’t just about nutrition — it’s a complete lifestyle shift. The mentoring sessions gave me the motivation and tools I needed to stay consistent, and I’ve never felt better.",
    title: "Professional and science-based course",
    rating: 5,
    img: "https://i.ibb.co/FbcbczSB/men.jpg",
  },
  {
    name: "Floyd Miles",
    role: "Sales Director",
    review:
      "I’ve tried many fitness programs before, but this one actually made a difference. The support and clear guidance helped me stay consistent and see real progress.",
    title: "The results speak for themselves",
    rating: 5,
    img: "https://i.ibb.co/hx7MCbwz/preview16.jpg",
  },
];

export default function Reviews() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
          What Our Clients Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={review.img}
                  alt={review.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {review.name}
                  </h3>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>

              {/* Title */}
              <h4 className="font-semibold text-xl text-gray-800 mb-3">
                {review.title}
              </h4>

              {/* Review */}
              <p className="text-gray-600 leading-relaxed mb-4">
                “{review.review}”
              </p>

              {/* Rating */}
              <div className="text-yellow-400 text-lg">
                {"★".repeat(review.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
