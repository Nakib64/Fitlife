"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Brain,
  BarChart,
  Apple,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

const faqs = [
  {
    question: "What is the Personalized Fitness & Wellness Coach?",
    answer:
      "It is an AI-powered platform that helps you track workouts, meals, and wellness activities. It also provides personalized suggestions to improve your fitness and overall lifestyle.",
    icon: <Brain className="w-6 h-6" />,
  },
  {
    question: "How does the AI provide recommendations?",
    answer:
      "Our AI analyzes your daily inputs such as meals, and workout data. Based on this information, it generates personalized tips to help you stay balanced and healthy.",
    icon: <BarChart className="w-6 h-6" />,
  },
  {
    question: "Can I track both fitness and nutrition?",
    answer:
      "Yes! The platform includes dedicated sections for tracking workouts and meals. You can log your exercises, monitor calorie intake, and get nutrition tips tailored to your lifestyle.",
    icon: <Apple className="w-6 h-6" />,
  },
  {
    question: "Do I need to pay for using the platform?",
    answer:
      "Currently, the platform is free to use during development. In the future, premium features like advanced AI coaching, detailed progress analytics, and meal planning may be offered.",
    icon: <CreditCard className="w-6 h-6" />,
  },
  {
    question: "Is my personal health data secure on this platform?",
    answer:
      "Yes, your privacy and data security are top priorities. All health and wellness data is stored securely, and we follow best practices in encryption and data protection to ensure your information remains confidential.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-[#f3f4f7] px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide 
  bg-gradient-to-r from-gray-800 via-slate-700 to-blue-600 
  text-transparent bg-clip-text animate-gradient">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 mb-7 text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to the most common questions about our AI Wellness
            Coach.
          </p>
        </div>

        {/* FAQ List */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                className={`rounded-2xl border transition-all shadow-md hover:shadow-lg ${
                  isActive
                    ? "bg-white border-[#C8FF58]"
                    : "bg-white border-gray-200"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isActive}
                  className="w-full flex justify-between items-center p-6 text-left transition"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#C8FF58]/20 text-[#C8FF58]"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {faq.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      isActive ? "rotate-180 text-[#C8FF58]" : "text-gray-500"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                      }}
                      className="px-6 pb-6 text-gray-700 leading-relaxed max-w-3xl mx-auto"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-700 text-lg mb-4">
            Still have questions? Our team is here to help.
          </p>
          <button className="px-8 py-3 rounded-full bg-[#C8FF58] text-gray-900 font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
