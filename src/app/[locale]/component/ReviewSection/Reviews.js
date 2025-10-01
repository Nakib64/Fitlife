"use client";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useTranslations } from "next-intl";

export function Reviews() {
  const t= useTranslations("home.testimonials");

  const testimonials = [
    {
      quote: t("testimonial1.quote"),
      name: t("testimonial1.name"),
      designation: t("testimonial1.designation"),
      rating: 5,
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
     quote: t("testimonial2.quote"),
      name: t("testimonial2.name"),
      designation: t("testimonial2.designation"),
      rating: 5,
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: t("testimonial3.quote"),
      name: t("testimonial3.name"),
      designation: t("testimonial3.designation"),
      rating: 4,
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
       quote: t("testimonial4.quote"),
      name: t("testimonial4.name"),
      designation: t("testimonial4.designation"),
      rating: 5,
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
       quote: t("testimonial5.quote"),
      name: t("testimonial5.name"),
      designation: t("testimonial5.designation"),
      rating: 5,
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />;
}
