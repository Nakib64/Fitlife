'use client';

import { motion } from 'framer-motion';
import {
  UserRoundCheck,
  Dumbbell,
  Apple,
  BarChartBig,
  Target,
  NotebookPen,
  Bot,
  Medal,
  Brain,
  Languages,
} from 'lucide-react';

const features = [
  {
    title: "User Profile & Biometric Data",
    description:
      "Input your personal details like age, weight, height, fitness goal, and activity level. AI generates personalized fitness & nutrition plans.",
    icon: UserRoundCheck,
  },
  {
    title: "AI-Powered Workout Recommendations",
    description:
      "Get daily & weekly adaptive workouts for both home and gym. Plans evolve as you log progress.",
    icon: Dumbbell,
  },
  {
    title: "AI-Based Nutrition & Diet Suggestions",
    description:
      "Personalized meal plans with calorie targets and options like vegetarian, low-carb, or high-protein.",
    icon: Apple,
  },

  {
    title: "Goal Setting & Achievement System",
    description:
      "Set fitness goals, track your journey, and celebrate milestones with digital badges.",
    icon: Target,
  },
  {
    title: "Workout & Meal Logging System",
    description:
      "Log your daily workouts and meals to get smarter AI recommendations.",
    icon: NotebookPen,
  },
  {
    title: "AI Chat Assistant (Fitness Bot)",
    description:
      "Ask quick questions like 'What to eat after workout?' or 'How many pushups today?' and get instant advice.",
    icon: Bot,
  },

];

// Card hover animation
const cardVariants = {
  hover: { y: -5, boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)' },
};

// Icon hover animation → infinite trembling left-right
const iconVariants = {
  hover: {
    x: [0, -4, 4, -4, 4, 0], // shaking motion
    transition: {
      repeat: Infinity,
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
};

export default function FeaturesGrid() {
  return (
    <section className="py-16 bg-gray-50">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          🚀 Our Powerful Features
        </h2>
        <p className="text-lg text-gray-600">
          Discover how <span className="font-semibold text-lime-400"> FitLife AI Coach </span> 
          helps you stay fit, eat smart, and achieve your goals with ease.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex flex-col p-6 bg-white rounded-xl shadow-md cursor-pointer hover:shadow-lg transition"
            whileHover="hover"
            variants={cardVariants}
            transition={{ duration: 0.3 }}
          >
            {/* Icon + Title same line */}
            <div className="flex items-center mb-4 space-x-4">
              <motion.div
                className="flex-shrink-0 w-12 h-12 flex justify-center items-center bg-indigo-100 rounded-full"
                variants={iconVariants}
              >
                <feature.icon size={28} className="text-lime-700" />
              </motion.div>
              <h3 className="text-2xl font-extrabold  text-gray-600">
                {feature.title}
              </h3>
            </div>
            <p className="text-gray-500">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
