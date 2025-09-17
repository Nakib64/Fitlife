"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";

const reviews = [
  {
    name: "Sofia Ramirez",
    role: "Fitness Instructor",
    review:
      "From the first day, Eliot has made me more comfortable and confident in my fitness training with him. After 8 months, I have seen great progress — lost weight and gained muscle.",
    title: "Great first-time fitness experience",
    rating: 5,
    img: "/ReviewImage/image1.jpeg",
  },
  {
    name: "James Parker",
    role: "Software Engineer",
    review:
      "This isn’t just about nutrition — it’s a complete lifestyle shift. The mentoring sessions gave me the motivation and tools I needed to stay consistent, and I’ve never felt better.",
    title: "Professional and science-based course",
    rating: 5,
    img: "/ReviewImage/image4.jpeg",
  },
  {
    name: "Floyd Miles",
    role: "Sales Director",
    review:
      "I’ve tried many fitness programs before, but this one actually made a difference. The support and clear guidance helped me stay consistent and see real progress.",
    title: "The results speak for themselves",
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
  const containerRef = useRef(null);

  // Auto scroll effect
  useEffect(() => {
    const container = containerRef.current;
    let scrollAmount = 0;
    const speed = 0.7;
    let requestId;

    const step = () => {
      if (!container) return;
      container.scrollLeft += speed;
      scrollAmount += speed;

      if (scrollAmount >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
        scrollAmount = 0;
      }

      requestId = requestAnimationFrame(step);
    };

    requestId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(requestId);
  }, []);

  const allReviews = [...reviews, ...reviews];

  return (
    <section className="py-20 w-full">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16 px-4">
        What Our Clients Say
      </h2>

      <div
        ref={containerRef}
        className="flex w-full overflow-hidden gap-6 px-4"
      >
        {allReviews.map((review, idx) => (
          <div
            key={idx}
            className="flex-none w-[90%] sm:w-[45%] md:w-[30%] relative rounded-2xl p-6 shadow-xl border border-gray-200 transition-transform duration-500 hover:scale-105"
            style={{ backgroundColor: "#E1F0E5" }} // Card body color
          >
            {/* Decorative shadow circles */}
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-100 rounded-full opacity-30 blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-pink-100 rounded-full opacity-20 blur-2xl"></div>

            {/* User Info */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={review.img}
                  alt={review.name}
                  fill
                  className="rounded-full object-cover border-2 border-white shadow-md"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">{review.name}</h3>
                <p className="text-sm text-gray-500">{review.role}</p>
              </div>
            </div>

            {/* Title */}
            <h4 className="font-semibold text-xl text-gray-800 mb-3">{review.title}</h4>

            {/* Review */}
            <p className="text-gray-700 leading-relaxed mb-4">{review.review}</p>

            {/* Rating */}
            <div className="text-yellow-400 text-lg font-bold">
              {"★".repeat(review.rating)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
