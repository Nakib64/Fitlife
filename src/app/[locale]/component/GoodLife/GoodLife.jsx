// // // // // // // "use client";

// // // // // // // import { motion } from "framer-motion";
// // // // // // // import Slider from "react-slick";
// // // // // // // import Image from "next/image";
// // // // // // // import { useState } from "react";
// // // // // // // import "slick-carousel/slick/slick.css";
// // // // // // // import "slick-carousel/slick/slick-theme.css";

// // // // // // // export default function GoodLife() {
// // // // // // //   const [activeTab, setActiveTab] = useState("food");

// // // // // // //   const tips = {
// // // // // // //     food: [
// // // // // // //       {
// // // // // // //         title: "Eat More Greens",
// // // // // // //         desc: "Leafy vegetables are rich in vitamins and minerals. Add spinach, kale, and broccoli to your meals daily.",
// // // // // // //         img: "/images/food1.jpg",
// // // // // // //       },
// // // // // // //       {
// // // // // // //         title: "Stay Hydrated",
// // // // // // //         desc: "Drink at least 8 glasses of water a day. Staying hydrated boosts energy and improves digestion.",
// // // // // // //         img: "/images/food2.jpg",
// // // // // // //       },
// // // // // // //       {
// // // // // // //         title: "Balanced Diet",
// // // // // // //         desc: "Mix proteins, carbs, and healthy fats in each meal to keep your energy steady throughout the day.",
// // // // // // //         img: "/images/food3.jpg",
// // // // // // //       },
// // // // // // //     ],
// // // // // // //     exercise: [
// // // // // // //       {
// // // // // // //         title: "Strength Training",
// // // // // // //         desc: "Lift weights 2-3 times per week to build muscle, improve bone density, and boost metabolism.",
// // // // // // //         img: "/images/exercise1.jpg",
// // // // // // //       },
// // // // // // //       {
// // // // // // //         title: "Cardio Boost",
// // // // // // //         desc: "30 minutes of walking, jogging, or cycling helps strengthen your heart and burn calories.",
// // // // // // //         img: "/images/exercise2.jpg",
// // // // // // //       },
// // // // // // //       {
// // // // // // //         title: "Stretch Regularly",
// // // // // // //         desc: "Stretching improves flexibility, reduces injury risk, and relaxes your muscles.",
// // // // // // //         img: "/images/exercise3.jpg",
// // // // // // //       },
// // // // // // //     ],
// // // // // // //     activity: [
// // // // // // //       {
// // // // // // //         title: "Daily Steps",
// // // // // // //         desc: "Aim for 8,000–10,000 steps daily. Take the stairs or walk short distances instead of driving.",
// // // // // // //         img: "/images/activity1.jpg",
// // // // // // //       },
// // // // // // //       {
// // // // // // //         title: "Posture Check",
// // // // // // //         desc: "Good posture reduces back pain and boosts confidence. Sit straight, keep your shoulders relaxed.",
// // // // // // //         img: "/images/activity2.jpg",
// // // // // // //       },
// // // // // // //       {
// // // // // // //         title: "Sleep Well",
// // // // // // //         desc: "7–9 hours of quality sleep every night improves recovery, mental focus, and mood.",
// // // // // // //         img: "/images/activity3.jpg",
// // // // // // //       },
// // // // // // //     ],
// // // // // // //   };

// // // // // // //   const sliderSettings = {
// // // // // // //     dots: true,
// // // // // // //     infinite: true,
// // // // // // //     autoplay: true,
// // // // // // //     speed: 600,
// // // // // // //     autoplaySpeed: 3000,
// // // // // // //     slidesToShow: 1,
// // // // // // //     slidesToScroll: 1,
// // // // // // //     arrows: false,
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="min-h-screen bg-[#f3f4f7] py-12">
// // // // // // //       <div className="max-w-7xl mx-auto px-6 text-center">
// // // // // // //         {/* Heading */}
// // // // // // //         <motion.h1
// // // // // // //           initial={{ opacity: 0, y: -30 }}
// // // // // // //           animate={{ opacity: 1, y: 0 }}
// // // // // // //           transition={{ duration: 0.6 }}
// // // // // // //           className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6"
// // // // // // //         >
// // // // // // //           Good Life Tips 🌿
// // // // // // //         </motion.h1>
// // // // // // //         <p className="text-gray-600 max-w-2xl mx-auto mb-10">
// // // // // // //           Stay healthy with daily guidance — from eating right and exercising smart to improving your everyday lifestyle.
// // // // // // //         </p>

// // // // // // //         {/* Tabs */}
// // // // // // //         <div className="flex justify-center gap-4 mb-8 flex-wrap">
// // // // // // //           <button
// // // // // // //             onClick={() => setActiveTab("food")}
// // // // // // //             className={`px-6 py-2 rounded-full font-semibold transition ${
// // // // // // //               activeTab === "food"
// // // // // // //                 ? "bg-[#cbff5b] text-black shadow"
// // // // // // //                 : "bg-black text-white hover:bg-gray-800"
// // // // // // //             }`}
// // // // // // //           >
// // // // // // //             Food Tips
// // // // // // //           </button>
// // // // // // //           <button
// // // // // // //             onClick={() => setActiveTab("exercise")}
// // // // // // //             className={`px-6 py-2 rounded-full font-semibold transition ${
// // // // // // //               activeTab === "exercise"
// // // // // // //                 ? "bg-[#cbff5b] text-black shadow"
// // // // // // //                 : "bg-black text-white hover:bg-gray-800"
// // // // // // //             }`}
// // // // // // //           >
// // // // // // //             Exercise Tips
// // // // // // //           </button>
// // // // // // //           <button
// // // // // // //             onClick={() => setActiveTab("activity")}
// // // // // // //             className={`px-6 py-2 rounded-full font-semibold transition ${
// // // // // // //               activeTab === "activity"
// // // // // // //                 ? "bg-[#cbff5b] text-black shadow"
// // // // // // //                 : "bg-black text-white hover:bg-gray-800"
// // // // // // //             }`}
// // // // // // //           >
// // // // // // //             Daily Activity Tips
// // // // // // //           </button>
// // // // // // //         </div>

// // // // // // //         {/* Slider */}
// // // // // // //         <motion.div
// // // // // // //           key={activeTab}
// // // // // // //           initial={{ opacity: 0, y: 30 }}
// // // // // // //           animate={{ opacity: 1, y: 0 }}
// // // // // // //           transition={{ duration: 0.6 }}
// // // // // // //           className="max-w-3xl mx-auto"
// // // // // // //         >
// // // // // // //           <Slider {...sliderSettings}>
// // // // // // //             {tips[activeTab].map((tip, idx) => (
// // // // // // //               <div key={idx} className="px-4">
// // // // // // //                 <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
// // // // // // //                   <div className="relative w-full h-64">
// // // // // // //                     <Image
// // // // // // //                       src={tip.img}
// // // // // // //                       alt={tip.title}
// // // // // // //                       fill
// // // // // // //                       className="object-cover"
// // // // // // //                     />
// // // // // // //                   </div>
// // // // // // //                   <div className="p-6 text-left">
// // // // // // //                     <h3 className="text-xl font-semibold text-gray-800 mb-2">
// // // // // // //                       {tip.title}
// // // // // // //                     </h3>
// // // // // // //                     <p className="text-gray-600">{tip.desc}</p>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             ))}
// // // // // // //           </Slider>
// // // // // // //         </motion.div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // "use client";

// // // // // // import { useRef } from "react";
// // // // // // import { motion, useScroll, useTransform } from "framer-motion";
// // // // // // // Replaced "next/image" with standard <img> tag to fix compilation error.
// // // // // // // import Image from "next/image";

// // // // // // const tips = [
// // // // // //   {
// // // // // //     id: 1,
// // // // // //     title: "Eat More Greens",
// // // // // //     desc: "Fill your plate with fresh green vegetables for energy and immunity.",
// // // // // //     img: "https://i.ibb.co.com/V0mfgGJM/image-1.png",
// // // // // //   },
// // // // // //   {
// // // // // //     id: 2,
// // // // // //     title: "Healthy Breakfast",
// // // // // //     desc: "Start your day with a colorful, nutrient-packed breakfast bowl.",
// // // // // //     img: "https://i.ibb.co.com/XZxpZzbb/image-2.png",
// // // // // //   },
// // // // // //   {
// // // // // //     id: 3,
// // // // // //     title: "Stay Hydrated",
// // // // // //     desc: "Drink enough water daily to boost focus and overall wellness.",
// // // // // //     img: "https://i.ibb.co.com/wrh6GZ7R/image-3.png",
// // // // // //   },
// // // // // //   {
// // // // // //     id: 4,
// // // // // //     title: "Morning Jog",
// // // // // //     desc: "Jogging in fresh air keeps your heart and mind strong.",
// // // // // //     img: "https://i.ibb.co.com/TJ32C0f/image-4.png",
// // // // // //   },
// // // // // //   {
// // // // // //     id: 5,
// // // // // //     title: "Yoga & Mindfulness",
// // // // // //     desc: "Practice yoga daily to reduce stress and improve flexibility.",
// // // // // //     img: "https://i.ibb.co.com/Y72pdJVc/image-5.png",
// // // // // //   },
// // // // // //   {
// // // // // //     id: 6,
// // // // // //     title: "Strength Training",
// // // // // //     desc: "Build muscle and stamina with regular weight training.",
// // // // // //     img: "https://i.ibb.co.com/PGn9ZyPB/image-6.png",
// // // // // //   },
// // // // // //   {
// // // // // //     id: 7,
// // // // // //     title: "Desk Stretching",
// // // // // //     desc: "Take short breaks to stretch while working for better posture.",
// // // // // //     img: "https://i.ibb.co.com/nXnWpZ0/image-7.png",
// // // // // //   },
// // // // // //   {
// // // // // //     id: 8,
// // // // // //     title: "Cycling Outdoors",
// // // // // //     desc: "Cycling is a fun way to stay active and explore your surroundings.",
// // // // // //     img: "https://i.ibb.co.com/B2ZVr0Jt/image-8.png",
// // // // // //   },
// // // // // //   {
// // // // // //     id: 9,
// // // // // //     title: "Evening Walk",
// // // // // //     desc: "Relax your body and mind with a peaceful evening walk.",
// // // // // //     img: "https://i.ibb.co.com/9HSmztZb/image-9.png",
// // // // // //   },
// // // // // // ];

// // // // // // export default function GoodLife() {
// // // // // //   const containerRef = useRef(null);
// // // // // //   const { scrollYProgress } = useScroll({
// // // // // //     target: containerRef,
// // // // // //     offset: ["start end", "end start"],
// // // // // //   });
  
// // // // // //   const y = useTransform(scrollYProgress, [0, 1], [-300, 0]);

// // // // // //   return (
// // // // // //     <section className="bg-[#f3f4f7] py-16">
// // // // // //       <div className="max-w-7xl mx-auto px-6">
// // // // // //         {/* Section Header */}
// // // // // //         <motion.div
// // // // // //           initial={{ opacity: 0, y: -20 }}
// // // // // //           animate={{ opacity: 1, y: 0 }}
// // // // // //           transition={{ duration: 0.6 }}
// // // // // //           className="text-center mb-12"
// // // // // //         >
// // // // // //           <h2 className="text-4xl font-bold text-gray-800 mb-4">
// // // // // //             GoodLife Tips
// // // // // //           </h2>
// // // // // //           <p className="text-gray-600 text-lg">
// // // // // //             Simple daily habits for a healthier and more energetic lifestyle.
// // // // // //           </p>
// // // // // //         </motion.div>

// // // // // //         {/* Horizontal Scroll Section */}
// // // // // //         <div className="relative">
// // // // // //           <div className="sticky top-0 h-screen overflow-hidden">
// // // // // //             <motion.div
// // // // // //               ref={containerRef}
// // // // // //               className="flex items-center space-x-8 px-8 h-full"
// // // // // //               style={{ x: y }}
// // // // // //             >
// // // // // //               {tips.map((tip, i) => (
// // // // // //                 <div
// // // // // //                   key={tip.id}
// // // // // //                   className="flex-none w-[350px] h-[450px] rounded-2xl shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 relative"
// // // // // //                 >
// // // // // //                   <motion.div
// // // // // //                     className="absolute inset-0 z-10"
// // // // // //                     initial={{ opacity: 0, y: 40 }}
// // // // // //                     whileInView={{ opacity: 1, y: 0 }}
// // // // // //                     transition={{ duration: 0.5, delay: i * 0.1 }}
// // // // // //                     viewport={{ once: true }}
// // // // // //                   >
// // // // // //                     <img
// // // // // //                       src={tip.img}
// // // // // //                       alt={tip.title}
// // // // // //                       className="object-cover rounded-2xl w-full h-full"
// // // // // //                     />
// // // // // //                     <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl transition-opacity duration-300 group-hover:bg-opacity-20" />
// // // // // //                   </motion.div>

// // // // // //                   <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white transform translate-y-20 transition-transform duration-500 group-hover:translate-y-0">
// // // // // //                     <motion.h3
// // // // // //                       initial={{ opacity: 0, y: 20 }}
// // // // // //                       whileInView={{ opacity: 1, y: 0 }}
// // // // // //                       transition={{ duration: 0.5, delay: i * 0.2 }}
// // // // // //                       className="text-3xl font-bold mb-2"
// // // // // //                     >
// // // // // //                       {tip.title}
// // // // // //                     </motion.h3>
// // // // // //                     <motion.p
// // // // // //                       initial={{ opacity: 0, y: 20 }}
// // // // // //                       whileInView={{ opacity: 1, y: 0 }}
// // // // // //                       transition={{ duration: 0.5, delay: i * 0.3 }}
// // // // // //                       className="text-lg font-light mb-4"
// // // // // //                     >
// // // // // //                       {tip.desc}
// // // // // //                     </motion.p>
// // // // // //                     <motion.button
// // // // // //                       initial={{ opacity: 0, y: 20 }}
// // // // // //                       whileInView={{ opacity: 1, y: 0 }}
// // // // // //                       transition={{ duration: 0.5, delay: i * 0.4 }}
// // // // // //                       className="bg-white text-gray-800 px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:bg-gray-200 transition-colors"
// // // // // //                     >
// // // // // //                       Explore
// // // // // //                     </motion.button>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </motion.div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </section>
// // // // // //   );
// // // // // // }


// // // // // "use client";

// // // // // import { useRef, useState, useEffect } from "react";
// // // // // import { motion, useScroll, useTransform } from "framer-motion";

// // // // // const tips = [
// // // // //   {
// // // // //     id: 1,
// // // // //     title: "Eat More Greens",
// // // // //     desc: "Fill your plate with fresh green vegetables for energy and immunity.",
// // // // //     img: "\images\image-1.png", // Replace this with your public image URL
// // // // //   },
// // // // //   {
// // // // //     id: 2,
// // // // //     title: "Healthy Breakfast",
// // // // //     desc: "Start your day with a colorful, nutrient-packed breakfast bowl.",
// // // // //     img: "\images\image-2.png", // Replace this with your public image URL
// // // // //   },
// // // // //   {
// // // // //     id: 3,
// // // // //     title: "Stay Hydrated",
// // // // //     desc: "Drink enough water daily to boost focus and overall wellness.",
// // // // //     img: "\images\image-3.png", // Replace this with your public image URL
// // // // //   },
// // // // //   {
// // // // //     id: 4,
// // // // //     title: "Morning Jog",
// // // // //     desc: "Jogging in fresh air keeps your heart and mind strong.",
// // // // //     img: "\images\image-4.png", // Replace this with your public image URL
// // // // //   },
// // // // //   {
// // // // //     id: 5,
// // // // //     title: "Yoga & Mindfulness",
// // // // //     desc: "Practice yoga daily to reduce stress and improve flexibility.",
// // // // //     img: "\images\image-5.png", // Replace this with your public image URL
// // // // //   },
// // // // //   {
// // // // //     id: 6,
// // // // //     title: "Strength Training",
// // // // //     desc: "Build muscle and stamina with regular weight training.",
// // // // //     img: "\images\image-6.png", // Replace this with your public image URL
// // // // //   },
// // // // //   {
// // // // //     id: 7,
// // // // //     title: "Desk Stretching",
// // // // //     desc: "Take short breaks to stretch while working for better posture.",
// // // // //     img: "\images\image-7.png", // Replace this with your public image URL
// // // // //   },
// // // // //   {
// // // // //     id: 8,
// // // // //     title: "Cycling Outdoors",
// // // // //     desc: "Cycling is a fun way to stay active and explore your surroundings.",
// // // // //     img: "\images\image-8.png", // Replace this with your public image URL
// // // // //   },
// // // // //   {
// // // // //     id: 9,
// // // // //     title: "Evening Walk",
// // // // //     desc: "Relax your body and mind with a peaceful evening walk.",
// // // // //     img: "\images\image-9.png", // Replace this with your public image URL
// // // // //   },
// // // // // ];

// // // // // const LazyImage = ({ src, alt }) => {
// // // // //   const [imageLoaded, setImageLoaded] = useState(false);
// // // // //   const imgRef = useRef(null);

// // // // //   useEffect(() => {
// // // // //     const observer = new IntersectionObserver(
// // // // //       (entries) => {
// // // // //         entries.forEach((entry) => {
// // // // //           if (entry.isIntersecting) {
// // // // //             setImageLoaded(true);
// // // // //             observer.disconnect();
// // // // //           }
// // // // //         });
// // // // //       },
// // // // //       { threshold: 0.5 } // Trigger when 50% of the image is in view
// // // // //     );

// // // // //     if (imgRef.current) {
// // // // //       observer.observe(imgRef.current);
// // // // //     }

// // // // //     return () => {
// // // // //       if (imgRef.current) {
// // // // //         observer.unobserve(imgRef.current);
// // // // //       }
// // // // //     };
// // // // //   }, []);

// // // // //   return (
// // // // //     <img
// // // // //       ref={imgRef}
// // // // //       src={imageLoaded ? src : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
// // // // //       alt={alt}
// // // // //       className={`object-cover rounded-2xl w-full h-full transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
// // // // //     />
// // // // //   );
// // // // // };

// // // // // export default function GoodLife() {
// // // // //   const containerRef = useRef(null);
// // // // //   const { scrollYProgress } = useScroll({
// // // // //     target: containerRef,
// // // // //     offset: ["start end", "end start"],
// // // // //   });

// // // // //   const y = useTransform(scrollYProgress, [0, 1], [-300, 0]);

// // // // //   return (
// // // // //     <section className="bg-[#f3f4f7] py-16">
// // // // //       <div className="max-w-7xl mx-auto px-6">
// // // // //         {/* Section Header */}
// // // // //         <motion.div
// // // // //           initial={{ opacity: 0, y: -20 }}
// // // // //           animate={{ opacity: 1, y: 0 }}
// // // // //           transition={{ duration: 0.6 }}
// // // // //           className="text-center mb-12"
// // // // //         >
// // // // //           <h2 className="text-4xl font-bold text-gray-800 mb-4">
// // // // //             GoodLife Tips
// // // // //           </h2>
// // // // //           <p className="text-gray-600 text-lg">
// // // // //             Simple daily habits for a healthier and more energetic lifestyle.
// // // // //           </p>
// // // // //         </motion.div>

// // // // //         {/* Horizontal Scroll Section */}
// // // // //         <div className="relative">
// // // // //           <div className="sticky top-0 h-screen overflow-hidden">
// // // // //             <motion.div
// // // // //               ref={containerRef}
// // // // //               className="flex items-center space-x-8 px-8 h-full"
// // // // //               style={{ x: y }}
// // // // //             >
// // // // //               {tips.map((tip, i) => (
// // // // //                 <div
// // // // //                   key={tip.id}
// // // // //                   className="flex-none w-[350px] h-[450px] rounded-2xl shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 relative"
// // // // //                 >
// // // // //                   <motion.div
// // // // //                     className="absolute inset-0 z-10"
// // // // //                     initial={{ opacity: 0, y: 40 }}
// // // // //                     whileInView={{ opacity: 1, y: 0 }}
// // // // //                     transition={{ duration: 0.5, delay: i * 0.1 }}
// // // // //                     viewport={{ once: true }}
// // // // //                   >
// // // // //                     <LazyImage src={tip.img} alt={tip.title} />
// // // // //                     <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl transition-opacity duration-300 group-hover:bg-opacity-20" />
// // // // //                   </motion.div>

// // // // //                   <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white transform translate-y-20 transition-transform duration-500 group-hover:translate-y-0">
// // // // //                     <motion.h3
// // // // //                       initial={{ opacity: 0, y: 20 }}
// // // // //                       whileInView={{ opacity: 1, y: 0 }}
// // // // //                       transition={{ duration: 0.5, delay: i * 0.2 }}
// // // // //                       className="text-3xl font-bold mb-2"
// // // // //                     >
// // // // //                       {tip.title}
// // // // //                     </motion.h3>
// // // // //                     <motion.p
// // // // //                       initial={{ opacity: 0, y: 20 }}
// // // // //                       whileInView={{ opacity: 1, y: 0 }}
// // // // //                       transition={{ duration: 0.5, delay: i * 0.3 }}
// // // // //                       className="text-lg font-light mb-4"
// // // // //                     >
// // // // //                       {tip.desc}
// // // // //                     </motion.p>
// // // // //                     <motion.button
// // // // //                       initial={{ opacity: 0, y: 20 }}
// // // // //                       whileInView={{ opacity: 1, y: 0 }}
// // // // //                       transition={{ duration: 0.5, delay: i * 0.4 }}
// // // // //                       className="bg-white text-gray-800 px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:bg-gray-200 transition-colors"
// // // // //                     >
// // // // //                       Explore
// // // // //                     </motion.button>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ))}
// // // // //             </motion.div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </section>
// // // // //   );
// // // // // }

// // // // "use client";

// // // // import { useRef, useState, useEffect } from "react";
// // // // import { motion, useScroll, useTransform } from "framer-motion";

// // // // const tips = [
// // // //   { id: 1, title: "Eat More Greens", desc: "Fill your plate with fresh green vegetables for energy and immunity.", img: "/images/image-1.png" },
// // // //   { id: 2, title: "Healthy Breakfast", desc: "Start your day with a colorful, nutrient-packed breakfast bowl.", img: "/images/image-2.png" },
// // // //   { id: 3, title: "Stay Hydrated", desc: "Drink enough water daily to boost focus and overall wellness.", img: "/images/image-3.png" },
// // // //   { id: 4, title: "Morning Jog", desc: "Jogging in fresh air keeps your heart and mind strong.", img: "/images/image-4.png" },
// // // //   { id: 5, title: "Yoga & Mindfulness", desc: "Practice yoga daily to reduce stress and improve flexibility.", img: "/images/image-5.png" },
// // // //   { id: 6, title: "Strength Training", desc: "Build muscle and stamina with regular weight training.", img: "/images/image-6.png" },
// // // //   { id: 7, title: "Desk Stretching", desc: "Take short breaks to stretch while working for better posture.", img: "/images/image-7.png" },
// // // //   { id: 8, title: "Cycling Outdoors", desc: "Cycling is a fun way to stay active and explore your surroundings.", img: "/images/image-8.png" },
// // // //   { id: 9, title: "Evening Walk", desc: "Relax your body and mind with a peaceful evening walk.", img: "/images/image-9.png" },
// // // // ];

// // // // const LazyImage = ({ src, alt }) => {
// // // //   const [imageLoaded, setImageLoaded] = useState(false);
// // // //   const imgRef = useRef(null);

// // // //   useEffect(() => {
// // // //     const observer = new IntersectionObserver(
// // // //       (entries) => {
// // // //         entries.forEach((entry) => {
// // // //           if (entry.isIntersecting) {
// // // //             setImageLoaded(true);
// // // //             observer.disconnect();
// // // //           }
// // // //         });
// // // //       },
// // // //       { threshold: 0.5 }
// // // //     );

// // // //     if (imgRef.current) {
// // // //       observer.observe(imgRef.current);
// // // //     }

// // // //     return () => {
// // // //       if (imgRef.current) {
// // // //         observer.unobserve(imgRef.current);
// // // //       }
// // // //     };
// // // //   }, []);

// // // //   return (
// // // //     <img
// // // //       ref={imgRef}
// // // //       src={imageLoaded ? src : ""}
// // // //       alt={alt}
// // // //       className={`object-cover rounded-2xl w-full h-full transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
// // // //     />
// // // //   );
// // // // };

// // // // export default function GoodLife() {
// // // //   const containerRef = useRef(null);
// // // //   const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
// // // //   const [containerWidth, setContainerWidth] = useState(0);

// // // //   useEffect(() => {
// // // //     if (containerRef.current) {
// // // //       setContainerWidth(containerRef.current.scrollWidth - window.innerWidth);
// // // //     }
// // // //   }, []);

// // // //   const x = useTransform(scrollYProgress, [0, 1], [0, -containerWidth]);

// // // //   return (
// // // //     <section className="bg-[#f3f4f7] py-16">
// // // //       <div className="max-w-7xl mx-auto px-6">
// // // //         {/* Section Header */}
// // // //         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
// // // //           <h2 className="text-4xl font-bold text-gray-800 mb-4">GoodLife Tips</h2>
// // // //           <p className="text-gray-600 text-lg">Simple daily habits for a healthier and more energetic lifestyle.</p>
// // // //         </motion.div>

// // // //         {/* Horizontal Scroll Section */}
// // // //         <div className="relative">
// // // //           <div className="sticky top-0 h-screen overflow-hidden">
// // // //             <motion.div ref={containerRef} className="flex items-center space-x-8 px-8 h-full" style={{ x }}>
// // // //               {tips.map((tip, i) => (
// // // //                 <div key={tip.id} className="flex-none w-[350px] h-[450px] rounded-2xl shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 relative group">
// // // //                   <motion.div
// // // //                     className="absolute inset-0 z-10"
// // // //                     initial={{ opacity: 0, y: 40 }}
// // // //                     whileInView={{ opacity: 1, y: 0 }}
// // // //                     transition={{ duration: 0.5, delay: i * 0.1 }}
// // // //                     viewport={{ once: true }}
// // // //                   >
// // // //                     <LazyImage src={tip.img} alt={tip.title} />
// // // //                     <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl transition-opacity duration-300 group-hover:bg-opacity-20" />
// // // //                   </motion.div>

// // // //                   <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white transform translate-y-20 transition-transform duration-500 group-hover:translate-y-0">
// // // //                     <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.2 }} className="text-3xl font-bold mb-2">
// // // //                       {tip.title}
// // // //                     </motion.h3>
// // // //                     <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.3 }} className="text-lg font-light mb-4">
// // // //                       {tip.desc}
// // // //                     </motion.p>
// // // //                     <motion.button initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.4 }} className="bg-white text-gray-800 px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:bg-gray-200 transition-colors">
// // // //                       Explore
// // // //                     </motion.button>
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </motion.div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }


// // // "use client";

// // // import { useRef, useState, useEffect } from "react";
// // // import { motion, useScroll, useTransform } from "framer-motion";

// // // const tips = [
// // //   { id: 1, title: "Eat More Greens", desc: "Fill your plate with fresh green vegetables for energy and immunity.", img: "/images/image-1.png" },
// // //   { id: 2, title: "Healthy Breakfast", desc: "Start your day with a colorful, nutrient-packed breakfast bowl.", img: "/images/image-2.png" },
// // //   { id: 3, title: "Stay Hydrated", desc: "Drink enough water daily to boost focus and overall wellness.", img: "/images/image-3.png" },
// // //   { id: 4, title: "Morning Jog", desc: "Jogging in fresh air keeps your heart and mind strong.", img: "/images/image-4.png" },
// // //   { id: 5, title: "Yoga & Mindfulness", desc: "Practice yoga daily to reduce stress and improve flexibility.", img: "/images/image-5.png" },
// // //   { id: 6, title: "Strength Training", desc: "Build muscle and stamina with regular weight training.", img: "/images/image-6.png" },
// // //   { id: 7, title: "Desk Stretching", desc: "Take short breaks to stretch while working for better posture.", img: "/images/image-7.png" },
// // //   { id: 8, title: "Cycling Outdoors", desc: "Cycling is a fun way to stay active and explore your surroundings.", img: "/images/image-8.png" },
// // //   { id: 9, title: "Evening Walk", desc: "Relax your body and mind with a peaceful evening walk.", img: "/images/image-9.png" },
// // // ];

// // // const LazyImage = ({ src, alt }) => {
// // //   const [imageLoaded, setImageLoaded] = useState(false);
// // //   const imgRef = useRef(null);

// // //   useEffect(() => {
// // //     const observer = new IntersectionObserver(
// // //       (entries) => {
// // //         entries.forEach((entry) => {
// // //           if (entry.isIntersecting) {
// // //             setImageLoaded(true);
// // //             observer.disconnect();
// // //           }
// // //         });
// // //       },
// // //       { threshold: 0.5 }
// // //     );

// // //     if (imgRef.current) {
// // //       observer.observe(imgRef.current);
// // //     }

// // //     return () => {
// // //       if (imgRef.current) {
// // //         observer.unobserve(imgRef.current);
// // //       }
// // //     };
// // //   }, []);

// // //   return (
// // //     <img
// // //       ref={imgRef}
// // //       src={imageLoaded ? src : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
// // //       alt={alt}
// // //       className={`object-cover rounded-2xl w-full h-full transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
// // //     />
// // //   );
// // // };

// // // export default function GoodLife() {
// // //   const containerRef = useRef(null);
// // //   const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

// // //   const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

// // //   return (
// // //     <section className="bg-[#f3f4f7] py-16">
// // //       <div className="max-w-7xl mx-auto px-6">
// // //         {/* Section Header */}
// // //         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
// // //           <h2 className="text-4xl font-bold text-gray-800 mb-4">GoodLife Tips</h2>
// // //           <p className="text-gray-600 text-lg">Simple daily habits for a healthier and more energetic lifestyle.</p>
// // //         </motion.div>

// // //         {/* Horizontal Scroll Section */}
// // //         <div className="relative">
// // //           <div className="sticky top-0 h-screen overflow-hidden">
// // //             <motion.div ref={containerRef} className="flex items-center space-x-8 px-8 h-full" style={{ x }}>
// // //               {tips.map((tip, i) => (
// // //                 <div key={tip.id} className="flex-none w-[350px] h-[450px] rounded-2xl shadow-md overflow-hidden bg-white relative group">
// // //                   <div className="absolute inset-0 z-10">
// // //                     <LazyImage src={tip.img} alt={tip.title} />
// // //                   </div>

// // //                   <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-black">
// // //                     <h3 className="text-3xl font-bold mb-2">{tip.title}</h3>
// // //                     <p className="text-lg font-light mb-4">{tip.desc}</p>
// // //                     <button className="bg-white text-gray-800 px-6 py-3 rounded-full text-sm font-semibold shadow-md transition-colors">
// // //                       Explore
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </motion.div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // "use client";

// // import { useRef, useState, useEffect } from "react";
// // import { motion, useScroll, useTransform } from "framer-motion";

// // const tips = [
// //   { id: 1, title: "Eat More Greens", desc: "Fill your plate with fresh green vegetables for energy and immunity.", img: "/images/image-1.png" },
// //   { id: 2, title: "Healthy Breakfast", desc: "Start your day with a colorful, nutrient-packed breakfast bowl.", img: "/images/image-2.png" },
// //   { id: 3, title: "Stay Hydrated", desc: "Drink enough water daily to boost focus and overall wellness.", img: "/images/image-3.png" },
// //   { id: 4, title: "Morning Jog", desc: "Jogging in fresh air keeps your heart and mind strong.", img: "/images/image-4.png" },
// //   { id: 5, title: "Yoga & Mindfulness", desc: "Practice yoga daily to reduce stress and improve flexibility.", img: "/images/image-5.png" },
// //   { id: 6, title: "Strength Training", desc: "Build muscle and stamina with regular weight training.", img: "/images/image-6.png" },
// //   { id: 7, title: "Desk Stretching", desc: "Take short breaks to stretch while working for better posture.", img: "/images/image-7.png" },
// //   { id: 8, title: "Cycling Outdoors", desc: "Cycling is a fun way to stay active and explore your surroundings.", img: "/images/image-8.png" },
// //   { id: 9, title: "Evening Walk", desc: "Relax your body and mind with a peaceful evening walk.", img: "/images/image-9.png" },
// // ];

// // const LazyImage = ({ src, alt }) => {
// //   const [imageLoaded, setImageLoaded] = useState(false);
// //   const imgRef = useRef(null);

// //   useEffect(() => {
// //     const observer = new IntersectionObserver(
// //       (entries) => {
// //         entries.forEach((entry) => {
// //           if (entry.isIntersecting) {
// //             setImageLoaded(true);
// //             observer.disconnect();
// //           }
// //         });
// //       },
// //       { threshold: 0.5 }
// //     );

// //     if (imgRef.current) {
// //       observer.observe(imgRef.current);
// //     }

// //     return () => {
// //       if (imgRef.current) {
// //         observer.unobserve(imgRef.current);
// //       }
// //     };
// //   }, []);

// //   return (
// //     <img
// //       ref={imgRef}
// //       src={imageLoaded ? src : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
// //       alt={alt}
// //       className={`object-cover rounded-2xl w-full h-full transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
// //     />
// //   );
// // };

// // export default function GoodLife() {
// //   const [paused, setPaused] = useState(false);
// //   const allTips = [...tips, ...tips]; // Duplicate the tips for a continuous loop

// //   return (
// //     <section className="bg-[#f3f4f7] py-16">
// //       <div className="max-w-7xl mx-auto px-6">
// //         {/* Section Header */}
// //         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
// //           <h2 className="text-4xl font-bold text-gray-800 mb-4">GoodLife Tips</h2>
// //           <p className="text-gray-600 text-lg">Simple daily habits for a healthier and more energetic lifestyle.</p>
// //         </motion.div>

// //         {/* Infinite Marquee */}
// //         <div
// //           className="overflow-hidden w-full"
// //           onMouseEnter={() => setPaused(true)}
// //           onMouseLeave={() => setPaused(false)}
// //         >
// //           <motion.div
// //             className="flex gap-4 px-4"
// //             animate={{ x: paused ? "0%" : ["0%", "-100%"] }}
// //             transition={{
// //               duration: 10,
// //               ease: "linear",
// //               repeat: Infinity,
// //             }}
// //           >
// //             {allTips.map((tip, idx) => (
// //               <div
// //                 key={idx}
// //                 className="flex-none w-[350px] h-[450px] rounded-2xl shadow-md overflow-hidden bg-white relative group"
// //               >
// //                 <div className="absolute inset-0 z-10">
// //                   <LazyImage src={tip.img} alt={tip.title} />
// //                 </div>
// //                 <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-white">
// //                   <h3 className="text-3xl font-bold mb-2">{tip.title}</h3>
// //                   <p className="text-lg font-light mb-4">{tip.desc}</p>
// //                   <button className="bg-white text-gray-800 px-6 py-3 rounded-full text-sm font-semibold shadow-md transition-colors">
// //                     Explore
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </motion.div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import clsx from "clsx";

// const tips = [
//   { id: 1, category: "Food", title: "Eat More Greens", desc: "Fill your plate with fresh green vegetables for energy.", img: "/images/image-1.png" },
//   { id: 2, category: "Food", title: "Healthy Breakfast", desc: "Start your day with a colorful, nutrient-packed bowl.", img: "/images/image-2.png" },
//   { id: 3, category: "Food", title: "Stay Hydrated", desc: "Drink enough water daily for focus and wellness.", img: "/images/image-3.png" },
//   { id: 4, category: "Exercise", title: "Morning Jog", desc: "Jogging in fresh air keeps your heart strong.", img: "/images/image-4.png" },
//   { id: 5, category: "Exercise", title: "Yoga & Mindfulness", desc: "Practice yoga to reduce stress and stay flexible.", img: "/images/image-5.png" },
//   { id: 6, category: "Exercise", title: "Strength Training", desc: "Build stamina and muscle with training.", img: "/images/image-6.png" },
//   { id: 7, category: "Activity", title: "Desk Stretching", desc: "Stretch at work for better posture.", img: "/images/image-7.png" },
//   { id: 8, category: "Activity", title: "Cycling Outdoors", desc: "Cycling keeps you active and happy.", img: "/images/image-8.png" },
//   { id: 9, category: "Activity", title: "Evening Walk", desc: "Relax your body and mind with walking.", img: "/images/image-9.png" },
// ];

// export default function GoodLife() {
//   const categories = ["Food", "Exercise", "Activity"];
//   const [activeCategory, setActiveCategory] = useState("Food"); // button highlight
//   const [manualCategory, setManualCategory] = useState(null); // if clicked
//   const [paused, setPaused] = useState(false);

//   const containerRef = useRef(null);

//   // Auto switch active button while scrolling
//   useEffect(() => {
//     if (manualCategory) return; // skip auto if user clicked

//     let index = 0;
//     const interval = setInterval(() => {
//       setActiveCategory(categories[index % categories.length]);
//       index++;
//     }, 6000); // every 6s change active category

//     return () => clearInterval(interval);
//   }, [manualCategory]);

//   // Mouse leave → resume auto scroll
//   const handleMouseLeave = () => {
//     setManualCategory(null);
//     setPaused(false);
//   };

//   // Filter tips if manual category chosen
//   const visibleTips = manualCategory
//     ? tips.filter((t) => t.category === manualCategory)
//     : [...tips, ...tips]; // infinite scroll

//   return (
//     <section
//       className="bg-[#f3f4f7] py-16"
//       onMouseLeave={handleMouseLeave}
//       ref={containerRef}
//     >
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Section Header */}
//         <div className="text-center mb-10">
//           <h2 className="text-4xl font-bold text-gray-800 mb-4">GoodLife Tips</h2>
//           <p className="text-gray-600 text-lg">
//             Simple daily habits for a healthier lifestyle.
//           </p>
//         </div>

//         {/* Category Buttons */}
//         <div className="flex justify-center gap-4 mb-8">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => {
//                 setManualCategory(cat);
//                 setActiveCategory(cat);
//                 setPaused(true);
//               }}
//               className={clsx(
//                 "px-6 py-2 rounded-full font-semibold transition",
//                 activeCategory === cat
//                   ? "bg-[#cbff5b] text-black"
//                   : "bg-black text-white hover:bg-gray-800"
//               )}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Infinite Scroll / Static */}
//         <div className="overflow-hidden w-full">
//           <motion.div
//             className="flex gap-6"
//             animate={{ x: paused || manualCategory ? "0%" : ["0%", "-100%"] }}
//             transition={{
//               duration: 20,
//               ease: "linear",
//               repeat: Infinity,
//             }}
//           >
//             {visibleTips.map((tip, i) => (
//               <div
//                 key={i}
//                 className="flex-none w-[280px] h-[360px] rounded-xl shadow-md overflow-hidden bg-white"
//               >
//                 <img
//                   src={tip.img}
//                   alt={tip.title}
//                   className="w-full h-2/3 object-cover"
//                 />
//                 <div className="p-4 h-1/3 bg-white">
//                   <h3 className="text-lg font-bold text-gray-800">
//                     {tip.title}
//                   </h3>
//                   <p className="text-sm text-gray-600">{tip.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const tips = [
  { id: 1, category: "Food", title: "Eat More Greens", desc: "Fill your plate with fresh green vegetables for energy.", img: "/images/image-1.png" },
  { id: 2, category: "Food", title: "Healthy Breakfast", desc: "Start your day with a colorful, nutrient-packed bowl.", img: "/images/image-2.png" },
  { id: 3, category: "Food", title: "Stay Hydrated", desc: "Drink enough water daily for focus and wellness.", img: "/images/image-3.png" },
  { id: 4, category: "Exercise", title: "Morning Jog", desc: "Jogging in fresh air keeps your heart strong.", img: "/images/image-4.png" },
  { id: 5, category: "Exercise", title: "Yoga & Mindfulness", desc: "Practice yoga to reduce stress and stay flexible.", img: "/images/image-5.png" },
  { id: 6, category: "Exercise", title: "Strength Training", desc: "Build stamina and muscle with training.", img: "/images/image-6.png" },
  { id: 7, category: "Activity", title: "Desk Stretching", desc: "Stretch at work for better posture.", img: "/images/image-7.png" },
  { id: 8, category: "Activity", title: "Cycling Outdoors", desc: "Cycling keeps you active and happy.", img: "/images/image-8.png" },
  { id: 9, category: "Activity", title: "Evening Walk", desc: "Relax your body and mind with walking.", img: "/images/image-9.png" },
];

export default function GoodLife() {
  const categories = ["Food", "Exercise", "Activity"];
  const [activeCategory, setActiveCategory] = useState("Food");
  const [manualCategory, setManualCategory] = useState(null);

  // auto change button highlight (if no manual category selected)
  useEffect(() => {
    if (manualCategory) return;

    let index = 0;
    const interval = setInterval(() => {
      setActiveCategory(categories[index % categories.length]);
      index++;
    }, 6000);

    return () => clearInterval(interval);
  }, [manualCategory]);

  const visibleTips = manualCategory
    ? tips.filter((t) => t.category === manualCategory) // only 3 static cards
    : [...tips, ...tips, ...tips]; // repeat multiple times for seamless loop

  return (
    <section
      className="bg-[#f3f4f7] py-16"
      onMouseLeave={() => setManualCategory(null)}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">GoodLife Tips</h2>
          <p className="text-gray-600 text-lg">
            Simple daily habits for a healthier lifestyle.
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setManualCategory(cat);
                setActiveCategory(cat);
              }}
              className={clsx(
                "px-6 py-2 rounded-full font-semibold transition",
                activeCategory === cat
                  ? "bg-[#cbff5b] text-black"
                  : "bg-black text-white hover:bg-gray-800"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="overflow-hidden w-full relative">
          {manualCategory ? (
            // ✅ show only 3 static cards in center
            <div className="flex justify-center gap-6">
              {visibleTips.map((tip) => (
                <div
                  key={tip.id}
                  className="flex-none w-[260px] h-[340px] rounded-xl shadow-md overflow-hidden bg-white"
                >
                  <img
                    src={tip.img}
                    alt={tip.title}
                    className="w-full h-[75%] object-cover"
                  />
                  <div className="p-3 h-[25%] bg-white">
                    <h3 className="text-base font-bold text-gray-800">
                      {tip.title}
                    </h3>
                    <p className="text-xs text-gray-600">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // ✅ Infinite continuous scroll left → right
            <motion.div
              className="flex gap-6"
              animate={{ x: ["-100%", "0%"] }}
              transition={{
                duration: 40, // speed
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {visibleTips.map((tip, i) => (
                <div
                  key={i}
                  className="flex-none w-[260px] h-[340px] rounded-xl shadow-md overflow-hidden bg-white"
                >
                  <img
                    src={tip.img}
                    alt={tip.title}
                    className="w-full h-[75%] object-cover"
                  />
                  <div className="p-3 h-[25%] bg-white">
                    <h3 className="text-base font-bold text-gray-800">
                      {tip.title}
                    </h3>
                    <p className="text-xs text-gray-600">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}


