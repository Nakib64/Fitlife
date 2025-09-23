import React from 'react'
import { FaUser, FaDumbbell, FaUtensils, FaChartLine, FaBullseye, FaClipboardCheck, FaRobot, FaGamepad, FaSpa, FaGlobe } from "react-icons/fa";

const features = [
  {
    icon: <FaUser className="text-3xl " />,
    title: "User Profile & Biometric Data",
    description:
      "Create your personal profile with age, weight, height, activity level, and fitness goals. Biometric data like steps, heart rate, and calories can also be synced. This foundation helps AI generate tailored fitness and wellness plans just for you.",
  },
  {
    icon: <FaDumbbell className="text-3xl " />,
    title: "AI-Powered Workout Recommendations",
    description:
      "Receive daily or weekly workout routines designed by AI, including home and gym exercises. Your plan adapts automatically as you log workouts, ensuring gradual progress while preventing injury and workout fatigue.",
  },
  {
    icon: <FaUtensils className="text-3xl " />,
    title: "AI-Based Nutrition & Diet Suggestions",
   description:
      "Get customized meal plans with exact calorie and nutrient breakdowns. The system suggests alternatives based on your dietary needs, such as vegetarian, low-carb, or high-protein, helping you stay healthy without sacrificing variety.",
  },
  {
    icon: <FaChartLine className="text-3xl " />,
    title: "Progress Tracking & Analytics",
     description:
      "Track your journey with interactive charts showing weight changes, calories burned, workout frequency, and nutrition trends. These insights keep you motivated by making progress visible and measurable.",
  },
  {
    icon: <FaBullseye className="text-3xl " />,
    title: "Goal Setting & Achievement System",
     description:
      "Set specific goals like losing 5kg, building muscle, or improving stamina. The system monitors your performance, adjusts your plan, and rewards you with digital badges when milestones are achieved, making fitness fun and rewarding.",
  },
  {
    icon: <FaClipboardCheck className="text-3xl" />,
    title: "Workout & Meal Logging System",
    description:
      "Easily log workouts and meals you complete each day. The AI continuously learns from your input and updates your fitness and meal plans in real-time, keeping them relevant to your lifestyle and progress.",
  },
  {
    icon: <FaRobot className="text-3xl " />,
    title: "AI Chat Assistant (Fitness Bot)",
     description:
      "A built-in chatbot acts as your personal trainer and nutritionist. Ask quick questions like 'What to eat after a workout?' or 'How many pushups should I do today?' and get instant AI-powered advice.",
  },
  {
    icon: <FaGamepad className="text-3xl" />,
    title: "Gamification & Rewards",
    description:
      "Stay motivated with fun features like daily streaks, achievement badges, and motivational quotes. The gamified approach turns fitness into an engaging challenge rather than a boring routine.",
  },
  {
    icon: <FaSpa className="text-3xl " />,
    title: "Mindfulness & Wellness Section",
    description:
      "Beyond fitness, focus on your overall well-being with guided breathing exercises, meditation tips, stress management advice, and sleep hygiene guidance for a healthier lifestyle.",
 },
  {
    icon: <FaGlobe className="text-3xl " />,
    title: "Multi-language Support",
    description:
      "Switch seamlessly between English and regional languages for a personalized experience. This makes the app more inclusive and comfortable for users from different backgrounds.",
  },
];

function FeaturesSection() {
  return (
         <section className="py-16 bg-[#e1f0e5]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Features</h2>
        <p className="text-gray-600 italic mb-12">
          Everything you need to achieve your fitness & wellness goals, all in one place.
        </p>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 sm:p-6 rounded-xl"
            >
              <div className="flex-shrink-0 bg-[#4fb067] p-5 rounded-full text-white">{feature.icon}</div>
              
               <div className='space-y-2'>
                 <h3 className="text-lg font-semibold text-gray-600">{feature.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{feature.description}</p>
               </div>
             
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection