"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is the Personalized Fitness & Wellness Coach?",
    answer:
      "It is an AI-powered platform that helps you track workouts, meals, and wellness activities. It also provides personalized suggestions to improve your fitness and overall lifestyle.",
  },
  {
    question: "How does the AI provide recommendations?",
    answer:
      "Our AI analyzes your daily inputs such as meals, and workout data. Based on this information, it generates personalized tips to help you stay balanced and healthy.",
  },
  {
    question: "Can I track both fitness and nutrition?",
    answer:
      "Yes! The platform includes dedicated sections for tracking workouts and meals. You can log your exercises, monitor calorie intake, and get nutrition tips tailored to your lifestyle.",
  },
  {
    question: "Do I need to pay for using the platform?",
    answer:
      "Currently, the platform is free to use during development. In the future, premium features like advanced AI coaching, detailed progress analytics, and meal planning may be offered.",
  },
  {
  question: "Is my personal health data secure on this platform?",
  answer:
    "Yes, your privacy and data security are top priorities. All health and wellness data is stored securely, and we follow best practices in encryption and data protection to ensure your information remains confidential.",
}

];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white px-6 pb-20 ">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Find answers to the most common questions about our AI Wellness
            Coach.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl border overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left text-gray-800 font-medium hover:bg-gray-100 transition"
              >
                <span>{faq.question}</span>
                <span
                  className={`transform transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </span>
              </button>

              {activeIndex === index && (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-6 pb-4 text-gray-600"
                >
                  {faq.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
