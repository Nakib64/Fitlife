"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";

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

// export default function PremiumReviews() {
//   const containerRef = useRef(null);

//   // Auto scroll effect
//   useEffect(() => {
//     const container = containerRef.current;
//     let scrollAmount = 0;
//     const speed = 0.7;
//     let requestId;

//     const step = () => {
//       if (!container) return;
//       container.scrollLeft += speed;
//       scrollAmount += speed;

//       if (scrollAmount >= container.scrollWidth / 2) {
//         container.scrollLeft = 0;
//         scrollAmount = 0;
//       }

//       requestId = requestAnimationFrame(step);
//     };

//     requestId = requestAnimationFrame(step);
//     return () => cancelAnimationFrame(requestId);
//   }, []);

//   const allReviews = [...reviews, ...reviews];

//   return (
//     <section className="py-20 w-full mb-20" style={{ backgroundColor: "#EBF1F1" }}>
//       {/* Section Title */}
//       <div className="text-center mb-16 px-4">
//         <p className="text-sm md:text-base tracking-wider font-semibold mb-4 text-green-600 relative inline-block">
//           WHAT CLIENTS SAY
//         </p>
//        <h1 className="text-6xl font-extrabold tracking-tight text-black mb-6">
//           Real Stories from our clients
//         </h1>
//       </div>

//       {/* Scrollable Reviews */}
//       <div
//         ref={containerRef}
//         className="flex w-full overflow-hidden gap-6 px-4"
//       >
//         {allReviews.map((review, idx) => (
//           <div
//             key={idx}
//             className="flex-none w-[90%] sm:w-[45%] md:w-[30%] rounded-2xl shadow-lg border border-gray-200 transition-transform duration-500 hover:scale-105"
//             style={{ backgroundColor: "#F4F9F9" }}
//           >
//             {/* Top Section (User Info + Rating) */}
//             <div
//               className="flex items-center justify-between p-4 rounded-t-2xl"
//               style={{ backgroundColor: "#ffffff" }}
//             >
//               <div className="flex items-center gap-4">
//                 <div className="relative w-16 h-16 flex-shrink-0">
//                   <Image
//                     src={review.img}
//                     alt={review.name}
//                     fill
//                     className="rounded-full object-cover border-2 border-gray-200 shadow-md"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg text-gray-900">
//                     {review.name}
//                   </h3>
//                   <p className="text-sm text-gray-500">{review.role}</p>
//                 </div>
//               </div>

//               {/* Rating aligned to the right */}
//               <div className="text-yellow-400 text-lg font-bold">
//                 {"★".repeat(review.rating)}
//               </div>
//             </div>

//             {/* Card Body */}
//             <div className="p-6">
//               <h4 className="font-semibold text-lg text-gray-800 mb-3">
//                 {review.title}
//               </h4>
//               <div className="bg-white/80 rounded-xl p-4 shadow-sm">
//                 <p className="text-gray-700 leading-relaxed">{review.review}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Bottom Badge */}
//       <div className="mt-12 text-center">
//         <span className="inline-block bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-full shadow-md">
//           ★ 4.9 Rating From 12k+ Reviews
//         </span>
//       </div>
//     </section>
//   );
// }
export default function PremiumReviews(){
  return <div>
    review
  </div>
}