"use client";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function Reviews() {
  const testimonials = [
    {
      quote:
        "The AI-powered workout plans feel like having a personal trainer 24/7. I've never been more consistent with my fitness routine.",
      name: "Sophia Martinez",
      designation: "Fitness Enthusiast",
      rating: 5,
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Nutrition tracking and personalized workout adjustments have helped me lose 10kg in just 3 months. Truly life-changing!",
      name: "David Johnson",
      designation: "Tech Professional",
      rating: 5,
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The AI coach motivates me daily and adapts workouts to my energy levels. It’s like my body is understood better than ever before.",
      name: "Aisha Khan",
      designation: "Student Athlete",
      rating: 4,
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "As a busy professional, I struggled to stay consistent. This app’s AI-driven short workouts are perfect for my lifestyle.",
      name: "Michael Lee",
      designation: "Entrepreneur",
      rating: 5,
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "I love how the AI tailors recovery days and stretches based on my progress. My performance has improved drastically!",
      name: "Emily Carter",
      designation: "Yoga Practitioner",
      rating: 5,
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />;
}
